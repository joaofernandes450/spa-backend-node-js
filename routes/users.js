var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var randomstring = require('randomstring');
var User = require('../app/models/user');

var authenticationMiddleware = require('./../app/helper/authentication');

/* PASSWORD ENCRYPT CONSTANTS */
const DIGITS_TO_REC = 6;
const DIGITS_TO_VALIDATE = 13;
const ENCRYPT_BITS = 8;

/* Async Helper*/
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * Handles new Users registration
 */
router.post('/register', asyncMiddleware(async (req, res, next) => {
  if (!req.body.password) return res.status(400).send({ success: false, message: 'Password is required' })
  if (!req.body.email) return res.status(400).send({ success: false, message: 'Email is required' })
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ success: false, message: 'Email already exists' });

  const hashedPassword = bcrypt.hashSync(req.body.password, ENCRYPT_BITS);
  const userHash = randomstring.generate(DIGITS_TO_VALIDATE); // generates a string with 13 characters

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    vat: req.body.vat,
    password: hashedPassword,
    address: req.body.address,
    deliveryInformation: req.body.deliveryInformation,
    userHash: userHash
  };
  try {
    await User.create(newUser);
  } catch (err) {
    return res.status(400).send({ success: false, message: 'Error while creating new User!' });
  }
  // Could send email here
  return res.status(201).send({ success: true, message: 'User successfully created!' });
}))

/**
 * Handles login
 */
router.post('/login', asyncMiddleware(async (req, res, next) => {
  if (!req.body.email) return res.status(400).send({
    success: false,
    message: 'Email is required.'
  });
  if (!req.body.password) return res.status(400).send({
    success: false,
    message: 'Password is required.'
  });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ success: false, message: 'Email not found!' });
  if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).send({ success: false, message: 'Email or password incorrect!' });

  authenticationMiddleware.createToken(user, function (token) {
    if (token === undefined) {
      return res.status(400).send({
        success: false,
        message: 'An error occured. Please try again later'
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Login successfully done!',
        token: token
      });
    }
  })
}))

module.exports = router;
