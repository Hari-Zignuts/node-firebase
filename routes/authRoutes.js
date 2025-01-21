const express = require('express');
const { login, signup, signout, currentUser, resetPassword, updateUserProfile, sendVerificationEmail, deleteUser } = require('../controller/authController');
const router = express.Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/signout').get(signout);
router.route('/currentUser').get(currentUser);
router.route('/resetPassword').post(resetPassword);
router.route('/updateProfile').put(updateUserProfile);
router.route('/sendVerificationEmail').post(sendVerificationEmail);
router.route('/deleteUser').delete(deleteUser);

module.exports = router;
