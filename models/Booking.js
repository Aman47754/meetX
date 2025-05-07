const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	activity: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Activity',
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
