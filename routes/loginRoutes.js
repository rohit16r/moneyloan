// const express = require('express');
// const userLogincontroller = require('../controllers/loginController');

// const loginin = express.Router();

// loginin.post('/login', userLogincontroller);

// module.exports = loginin;
// loginRoutes.js
const express = require('express');
const loginroutes = express.Router();

const userLogincontroller = (req, res) => {
  res.send('Login route working!');
};

loginroutes.post('/login', userLogincontroller);

module.exports = loginroutes;