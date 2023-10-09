const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');

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

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log('Welcome to update my records');
  //1. create error if your posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Password updates cannot be done on this route',
    });
  }

  const newToken = checkToken(req, res);

  const decoded = await promisify(jwt.verify)(newToken, process.env.JWT_SECRET);

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
  currentUser.set({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email,
  });
  const updatedUser = await currentUser.save();
  updatedUser.password = undefined;
  updatedUser.passwordConfirm = undefined;

  if (updatedUser)
    return res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
});

exports.deleteMe = catchAsync(async (req, res) => {
  const newToken = checkToken(req, res);

  const decoded = await promisify(jwt.verify)(newToken, process.env.JWT_SECRET);

  await Users.destroy({
    where: {
      user_id: decoded.id,
    },
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.dashboard = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Dashboard',
  });
});
