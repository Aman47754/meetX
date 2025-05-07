const jwt= require('jsonwebtoken');
require('dotenv').config();
const User= require('../models/User');

exports.auth= async (req ,res ,next)=>{
    try {
        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized, token not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ status: false, message: "Unauthorized, invalid token" });
        }
        req.user=decoded;

        next();
    } catch (error) {
        res.status(500).json({ status: false, message: "Something went wrong while token verification", error: error.message });
    }
}