const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Example: convert Test@test.com => test@test.com
      .isEmail(), // Checks the input is a valid email address
    check('password')
      .isLength({ min: 6 })
  ],
  usersControllers.createUser
);

router.post('/login', usersControllers.login);

module.exports = router;