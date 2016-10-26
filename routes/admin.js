var express = require('express');
var router = express.Router();
var debug = require('debug')('app:passport');
var Order = require('../models/order.model');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: "cursoopenwebinar@gmail.com",
		pass: "cursocursocurso"
	}
});

var mailOptions = {
	from: 'Pizzería <cursoopenwebinar@gmail.com>',
	to: '',
	subject: 'Su pedido está listo',
	text: 'En breve recibirá la pizza en su domicilio!'
	// html: '<b>En breve recibirá la pizza en su domicilio!</b>'
};

router.get('/', function(req, res) {
	Order.find({})
	.populate('customer')
	.exec(function(err, orders) {
		if (err) throw err;
		res.render('admin', { orders: orders });
	});
});

router.get('/order/:order/:state', function(req, res) {
	Order.update({_id: req.params.order}, {"$set": {state: req.params.state}})
	.exec(function(err, updated) {
		if (err) throw err;

		if (req.params.state == "ready") {
			// Send email
			Order.findOne({_id: req.params.order})
			.populate('customer')
			.exec(function(err, order) {
				if (err) throw err;
				if (order.email_on_ready) {
					mailOptions.to = order.customer.email;
					mailOptions.text = "Hola" + order.customer.username + ". Su pedido está listo, en breve recibirá su pedido.";
						transporter.sendMail(mailOptions, function(err, info) {
							if (err) throw err;
							debug("Info email:", info);
						});
				} else {
					debug("El usuario no quere notificación por email.")
				}
			});
		}
		res.redirect('/admin');
	});
});

module.exports = router;