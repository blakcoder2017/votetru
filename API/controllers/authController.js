const crypto = require('crypto');

const Users = require('../models/userModel');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('./../utils/email');

//Signing Tokens
const signToken = (user) => {
  return jwt.sign({ id: user }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
};

createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.user_id);

  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

const registerStatus = (statusCode, req, res) => {
  res.status(statusCode).json({
    status: 'success',
    message: 'Registration successful!',
  });
};

const checkToken = (req, res) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      message: 'You are not logged in, Please log in to get access',
    });
  }

  return token;
};

exports.register = catchAsync(async (req, res, next) => {
  const checkUserEmail = await Users.findOne({
    where: { email: req.body.email },
  });
  if (checkUserEmail)
    return res
      .status(500)
      .json({ status: 'Failed', message: 'User already registered' });

  if (req.body.password !== req.body.confirmPassword)
    return res
      .status(500)
      .json({ status: 'Failed', message: 'Passwords do not match!' });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  await Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  registerStatus(200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if the email and password exist.
  if (!email || !password) {
    return res.status(400).json({
      status: 'Failed',
      message: 'please provide and email and password',
    });
  }

  //check if the user exist in the database
  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(401).json({
      status: 'Failed',
      message: 'User not found',
    });
  }

  //compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log('this is checked password:', passwordMatch);
  if (!passwordMatch) {
    return res.status(401).json({
      status: 'Failed',
      message: 'Your password is incorrect',
      data: {
        passwordMatch,
      },
    });
  }

  //sgin the token
  // const token = createSendToken(user, 200, req, res);

  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1. Getting the token and check if it is there.

  const newToken = checkToken(req, res);
  const decoded = await promisify(jwt.verify)(newToken, process.env.JWT_SECRET);

  //3. Check if user still exists
  const currentUser = await Users.findOne({
    where: {
      user_id: decoded.id,
    },
  });

  if (!currentUser) {
    return res
      .status(401)
      .json({ status: 'Failed', message: 'User not found' });
  }

  //4. check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: 'Failed',
      message: 'You recently changed your password! Please log in again',
    });
  }

  //grant access to protected route
  req.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  //1. get user information based on submitted email
  const user = await Users.findOne({
    where: { email: email },
  });

  if (!user) {
    return res.status(404).json({
      status: 'Failed',
      message: `Email address (${email}) does not exist`,
    });
  }

  //2. generate a random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3. send the token to the user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    console.log(resetURL);

    const message = `<h1>Submit a request with your new password and password confirm to:${resetURL}.\nIf you did not forget your password please ignore this email message`;
    await sendEmail({
      email: user.email,
      subject: 'Your password reset link on Vote True',
      message: resetURL,
    });
    res.status(200).json({
      status: 'success',
      message:
        'Password reset link was successfully sent to your registered emaill address!',
    });
  } catch {
    user.passwordResetToken = '';
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: 'Failed',
      message: 'There was an error sending the email. Try again later!',
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Passwords do not match.',
    });
  }
  //1. get user based on the
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Users.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { [Op.gt]: Sequelize.fn('CURDATE') },
    },
  });
  //console.log('my user: ', user);
  //2. if token is not expired, and there is user, set new password
  if (!user) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Token is expired or not valid.',
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // const updatedUser = await Users.update(
  //   {
  //     password: hashedPassword,
  //     passwordConfirm: req.body.passwordConfirm,
  //     passwordResetToken: '',
  //     passwordResetExpires: '',
  //   },
  //   {
  //     where: {
  //       email: user.email,
  //     },
  //   }
  // );

  user.password = hashedPassword;
  user.passwordChangedAt = Date.now() - 1000;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = '';
  user.passwordResetExpires = null;

  await user.save();
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const decoded = checkToken(req, res);

  //check if the user still exists
  const currentUser = await Users.findOne({
    where: {
      user_id: decoded.id,
    },
  });

  //2. check if the posted password is correct
  if (!currentUser) {
    return res.status(401).json({
      status: 'Failed',
      message: 'User not found',
    });
  }

  //compare passwords
  const passwordMatch = await bcrypt.compare(
    req.body.passwordCurrent,
    currentUser.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      status: 'Failed',
      message: 'Your current password is incorrect',
      data: {
        passwordMatch,
      },
    });
  }

  //sgin the token
  // const token = createSendToken(user, 200, req, res);
  //3. if so update password
  currentUser.password = req.body.password;
  currentUser.passwordConfirm = req.body.passwordConfirm;
  await currentUser.save();

  createSendToken(currentUser, 200, req, res);
});

exports.logout = (req, res) => {};
