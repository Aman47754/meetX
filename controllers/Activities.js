const Activity = require('../models/Activities');

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find(); // Fetch all activities from DB

    res.status(200).json({
      status: true,
      message: 'Activities fetched successfully',
      activities,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch activities',
      error: error.message,
    });
  }
};


