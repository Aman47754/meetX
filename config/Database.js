const mongoose= require('mongoose');
require('dotenv').config();

exports.connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>{
        console.log("DB Connection Error: "+err.message);
        process.exit(1);
    })


}