const express= require('express');


const app= express();
require('dotenv').config();

const database= require('./config/Database');
const userRouter=require('./routes/user')
const activityRouter=require('./routes/Activities');
const bookingRouter=require('./routes/Booking');
const cookieParser = require('cookie-parser');

const PORT= process.env.PORT || 3000;

database.connectDB();

app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth',userRouter);
app.use('/api/getAllActivities',activityRouter);
app.use('/api/booking',bookingRouter);

//base route
app.get('/',(req,res)=>{
    res.send("API is running...");
})

app.listen(PORT,()=>{
    console.log("Listening to port "+PORT);
})


