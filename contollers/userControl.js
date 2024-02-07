const express = require("express")
const session = require("express-session")
const users = require("../models/userModel")
const bcrypt=require("bcrypt")



//adding user,before that check user and email already exist or not
const addUser=async(req,res)=>{
    const userFound=await users.findOne({username:req.body.username})
    const userEmail=await users.findOne({email:req.body.email})
    try{
        if(userFound){
            res.redirect("/signup?usernameFound=user already exist")
        }
        else if(userEmail){
            res.redirect("/signup?message=try another email")
        }
        else{
            const hashedPass=await bcrypt.hash(req.body.password,10)
            const emailUser=req.body.email
            
            const newUser=new users({
                username:req.body.username,
                password:hashedPass,
                email:req.body.email,
                isAdmin:0
            })
            await newUser.save()
            res.redirect("/?msg=new user created")
        }
    }
    catch(e){
        console.log(e.message)
        res.redirect("/error?message=somthing went wrong while signup")
    }
}



// user authentication and session creation for that user

const checkUserIn = async (req, res) => {
    try {
        var checkUser = await users.findOne({ username: req.body.username })
        console.log(req.body.username)
        console.log(checkUser)
        console.log("isUser redirect")
       
        if (checkUser) {
            const checkPass=await bcrypt.compare(req.body.password,checkUser.password)
            console.log("user found");
            if(checkPass){
                console.log("login done")
                req.session.isUserAuth=true
                req.session.email=checkUser.email
                req.session.username=checkUser.username
                res.redirect("/home/${req.session.username}")
            }else{
                res.redirect("/?errPassword=invalid password")
            }
        }else{
            res.redirect("/?errUser=invalid username")
        }
    }catch(e){
        console.log(e.message);
        res.redirect("/error?message=something went wrong while signing up ")
    }
}
            


//logging out user session
const checkUserOut=async(req,res)=>{
    await req.session.destroy()
    res.redirect("/")
}

module.exports = { checkUserIn, addUser,checkUserOut}