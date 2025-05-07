
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup= async (req ,res )=>{
    try {
        
        const {name,email,phoneNumber,password}= req.body;
        if(!name || !email || !phoneNumber || !password){
            return res.status(400).json({status:false,message: "Please fill all the fields"});
        }

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({status:false,message: "User already exists"});
        }

        //passwords hashing
        const hashedpassword= await bcrypt.hash(password,10);
        //create user
        const user= await User.create({
            name,
            email,
            phoneNumber,
            password: hashedpassword
        })
        res.status(201).json({status:true,message: "User created successfully",user});

    } catch (error) {
        res.status(500).json({status:false,message: "User creation failed",error:error.message});
        console.log(error.message);
    }
}

exports.login= async (req ,res )=>{
    try {
        
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({status:false,message: "Please fill all the fields"});
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({status:false,message: "User does not exist"});
        }

        //passwords matching
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({status:false,message: "Invalid password"});
        }

        //token generation
        const token=  jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        user.password= undefined; //remove password from user object
        user.token= token; //add token to user object

        
        //cookies for token
        const options= {
            expires: new Date(Date.now() + 1*24*60*60*1000), 
            httpOnly: true,
        }
        res.cookie('token',token,options).status(200).json({
            status:true,
            token,
            message: "User logged in successfully",
            user,
        });


    } catch (error) {
        res.status(500).json({status:false,message: "User login failed",error:error.message});
        console.log(error.message);
    }
}
