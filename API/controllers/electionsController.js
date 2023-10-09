const crypto = require('crypto');
require('dotenv').config();
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const catchAsync = require('./../utils/catchAsync');
const Elections = require('./../models/electionsModel');
const { newToken } = require('./../utils/checktoken');

const sendResponse = (data, statusCode, req, res) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

exports.elections = catchAsync(async (req, res, next) => {
  //1. get user token and use it to get elections belonging the logged in user
  const userToken = newToken(req, res);
  const decoded = await promisify(jwt.verify)(
    userToken,
    process.env.JWT_SECRET
  );
  //2. check if the user has created any elections
  const newElections = await Elections.findOne({
    where: {
      user_id: decoded.id,
    },
  });

  if (!newElections) {
    return res.status(401).json({
      status: 'Failed',
      message: 'No elections found for your',
    });
  }

  sendResponse(newElections, 200, req, res);
});

exports.deleteElection = catchAsync(async (req, res, next) => {});
exports.editElection = catchAsync(async (req, res, next) => {});
exports.closeElection = catchAsync(async (req, res, next) => {});
