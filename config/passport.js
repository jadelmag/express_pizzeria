var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');
var debug = require('debug')('app:passport');
var User = require('../models/user.model');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		var userInfo = _.pick(user, 'username', 'email', '_id', 'rol');
		done(err, userInfo);
	});
});

passport.use(new LocalStrategy({
	usernameField: 'user',
	passwordField: 'password'
}, function(username, password, done) {
	User.findByUserName(username, function(err, user) {
		if (err) done (new Error("Error de autenticación"));
		if (!user) {
			return done(null, false, {message: 'El usuario no existe'});
		}
		if (user.password != password) {
			return done(null, false, {message: 'La contraseña es inválida'});
		}
		debug("Usuario atenticado");
		return done(null, _.pick(user, 'username', 'email', '_id'));
	});
}));

module.exports = passport;