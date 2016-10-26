var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	state: {
		type: String,
		enum: ['pending', 'cooking', 'ready'],
		default: 'pending'
	},
	pizza: {
		type: String
	},
	order_date: {
		type: Date,
		default: Date.now
	},
	email: {
		type: String
	},
	email_on_ready: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('order', orderSchema);