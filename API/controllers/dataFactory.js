const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appErrors');
const APIFeatures = require('./../utils/apiFeatures');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const record = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: record,
      },
    });
  });
