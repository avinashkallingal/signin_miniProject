const express=require("express")
const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/sampleData")

.then(()=>{console.log("connection established with mongoDB")})
.catch((error)=>{console.log(error.message)})

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        required:true
    }
    
});
module.exports=mongoose.model("users",userSchema)