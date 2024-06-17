const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetchiong users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    console.log(errors);
    // Can use the errors object to build error specific messages
    return next(
      new HttpError('Invalid input, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let exisitingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, try again later.',
      500
    );
    return next(error);
  }
  
  if (exisitingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.depositphotos.com%2F7-types-of-abstract-art-for-inspiring-designs.html&psig=AOvVaw0WCD7SoxWhS60ZRpEdo0GH&ust=1718359087488000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDxgsyo2IYDFQAAAAAdAAAAABAE',
    password,
    places: []
  });
  
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, try again later.',
      500
    );
    return next(error);
  }
  
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;