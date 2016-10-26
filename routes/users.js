var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.model');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', function(req, res) {
	var post = req.body;

	var validation_errors = [];
	if (!post.username) validation_errors.push("El nombre de usuario no puede estar vacío.");
	if (!post.password) validation_errors.push("La contraseña no puede estar vacía.");
	if (post.password != post.password2) validation_errors.push("Las contraseñas deben coincidir.");
	if (!post.email) validation_errors.push("El correo no puede estar vacío.");
	if (validation_errors.length) return res.render('register', { validationErrors: validation_errors});


	User.create(post, function(err, result) {
		if (err) throw err;
		req.login(result, function(err) {
			if (err) throw err;
			res.redirect('/');
		});
	});
});

var passportAuth = passport.authenticate('local', {failureRedirect: '/user/login' , failureFlash: false });

router.post('/auth', passportAuth, function(req, res) {
	var post = req.body;
	res.redirect('/');
});

module.exports = router;
