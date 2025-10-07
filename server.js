require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const router= require('./routes/navRoutes');
const signroutes= require('./routes/signupRoutes')
const  loginin= require('./routes/loginRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/',router);
app.use('/',signroutes);
app.use('/',loginin); // all routes start from root

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'loan-website-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make user data available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});



// Home route
app.get('/', (req, res) => {
    res.render('signup.ejs', { 
        user: req.session.user 
    });
});



const dburl =
  "mongodb+srv://rohit16r:Rohit%40843120@cluster0.mzrcdcn.mongodb.net/test";
mongoose
  .connect(dburl)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => {
    console.error("❌ DB not connected", error.message);
  });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});