const express= require('express');
const router=express.Router();

const {getAllActivities}= require('../controllers/Activities');



// Route for getting all activities
router.get("/",getAllActivities);

module.exports=router;