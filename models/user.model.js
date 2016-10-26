var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	rol: {
		type: String,
		enum: ['cliente', 'admin'],
		default: 'cliente' 
		// change default option to create an admin
		// and access to admin panel
	}
});

// Método estático
UserSchema.statics.findByUserName = function(username, cb) {
	this.model('user').findOne({username: username}, cb);
};

module.exports = mongoose.model('user', UserSchema);