const express=required("express")
const mongoose=required("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/sampleData")

const adminSchema=new mongoose.schema({
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
})
module.exports=mongoose.model("admin",adminSchema)