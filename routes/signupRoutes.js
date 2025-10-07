const express = require('express');
// const userLogincontroller = require('../controllers/loginController');
const signing = require('../controllers/signupControllers.js');

const signroutes = express.Router();

// Correct router variable used here
signroutes.post('/signup', signing);

module.exports = signroutes;