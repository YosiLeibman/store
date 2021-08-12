// imports
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('./db/models')
const {onlyNotUsers, onlyUsers} = require('./helpers/verify')
const path = require('path')


// initialize express
const app = express()

// connect to db
require('./config/db')()

// middleweres
app.use(session({ 
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true
 }))
app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err)
			}
			if (!user) { 
				return done(null, false, { message: 'Incorrect username.' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' })
			}
			return done(null, user)
		})
	})
)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
passport.serializeUser((user,done)=>{
    done(null, user._id)
})
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

app.use('/auth', require('./routes/auth'))
app.use('/products', require('./routes/products'))

// main page
app.get('/', onlyUsers, (req, res) => {
    res.sendFile(path.join(__dirname, '/views/main.html'))
    // console.log("authenticated:",req.isAuthenticated())
    // console.log("user:",req.user)
})
 
// listen
app.listen(80, () => console.log("port 1000's up"))
