const express = require('express');
const router=express.Router();

const  {login,signup}= require('../controllers/Auth');    



// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)


module.exports=router;