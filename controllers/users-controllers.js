const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Georgina',
    email: 'test@test.com',
    password: 'tester1'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    console.log(errors);
    // Can use the errors object to build error specific messages
    throw new HttpError('Invalid input, please check your data.', 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser){
    throw new HttpError('A user already exists for this email address', 422)
  }

  const createdUser = {
    id: uuidv4(),
    name, // name: name behind the scene
    email,
    password
  };
  DUMMY_USERS.push(createdUser);

  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401)
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;