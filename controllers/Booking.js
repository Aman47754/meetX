const Activities = require('../models/Activities');
const User = require('../models/User');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
	try {
		const { activityId, bookingDate } = req.body;
		const userId = req.user.id;

		// Validate input
		if (!activityId || !bookingDate) {
			return res.status(400).json({ status: false, message: 'Please fill all the fields' });
		}

		// Check if activity exists
		const activity = await Activities.findById(activityId);
		if (!activity) {
			return res.status(404).json({ status: false, message: 'Activity not found' });
		}

		// Check if user exists
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ status: false, message: 'User not found' });
		}

		// Optional: prevent duplicate booking
		const existingBooking = await Booking.findOne({ user: userId, activity: activityId });
		if (existingBooking) {
			return res.status(400).json({ status: false, message: 'Activity already booked' });
		}

		// Create a new booking
		const newBooking = await Booking.create({
			user: userId,
			activity: activityId,
			date: bookingDate,
		});

		// Add booking to user's bookings
		user.bookings.push(newBooking._id);
		await user.save();

		// Populate updated user with booking details
		const updatedUser = await User.findById(userId)
			.populate({
				path: 'bookings',
				populate: {
					path: 'activity',
				},
			})
			.exec();

		res.status(201).json({
			status: true,
			message: 'Booking created successfully',
			user: updatedUser,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			status: false,
			message: 'Failed to create booking',
			error: error.message,
		});
	}
};

exports.getUserBookings = async (req, res) => {
	try {
		const userId = req.user.id;

		// Check if user exists and populate bookings with activity details
		const user = await User.findById(userId)
			.populate({
				path: 'bookings',
				populate: {
					path: 'activity',
					model: 'Activity',
				},
			});

		if (!user) {
			return res.status(404).json({
				status: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			status: true,
			message: "User bookings fetched successfully",
			bookings: user.bookings,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			status: false,
			message: "Failed to fetch bookings",
			error: error.message,
		});
	}
};

