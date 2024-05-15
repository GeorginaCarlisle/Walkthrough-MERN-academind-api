const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post('/signup', usersControllers.createUser);

router.post('/login', usersControllers.login);

module.exports = router;