const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/Database');

const Users = db.define(
  'users',
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPhoneNumber: function (val) {
          // Regular expression to match a simple phone number pattern (e.g., +1234567890)
          if (!/^\+?\d+$/.test(val)) {
            throw new Error('Invalid phone number format');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'The email is invalid, please proivde a valid email.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 8,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      min: 8,
      validate: {
        isConfirmed(value) {
          if (value !== this.password) {
            throw new Error('Passwords do not match.');
          }
        },
      },
    },
    passwordChangedAt: { type: DataTypes.DATE },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExpires: { type: DataTypes.DATE },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'creator',
    },
    tokenIssuedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

//this is for checking if the password was changed after last login
Users.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (Users.passwordChangedAt) {
    const changedTimestanp = parseInt(
      Users.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestanp;
  }
  //false means not changed password
  return false;
};

Users.prototype.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);
  //expires in 10 mins
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

// Users.beforeSave(async (user, options) => {
//   if (user.changed('password')) {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     user.passwordChangedAt = Date.now() - 1000;
//   }
// });

module.exports = Users;
