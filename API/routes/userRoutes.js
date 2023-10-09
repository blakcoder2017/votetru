const express = require('express');
const {
  updateMe,
  deleteMe,
  dashboard,
} = require('./../controllers/userController');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('./../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

//resetting not logged in user password
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

//updating logged in user password.
router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

router.get('/dashboard', protect, dashboard);

module.exports = router;
