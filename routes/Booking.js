const express= require('express');
const router=express.Router();

const {auth}= require('../middlewares/auth');
const {createBooking,getUserBookings}= require('../controllers/Booking');


// Route for creating a booking
router.post("/createBooking",auth,createBooking);
router.get("/getUserBookings",auth,getUserBookings);



module.exports=router;