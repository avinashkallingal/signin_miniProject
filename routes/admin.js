const app = require('express')
const admin = require("../contollers/adminControl")
const { request } = require('../app')
const session = require("express-session")
const router = app.Router()

router.use(function (req, res, next) {
    res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
    res.header("Express", "-1");
    res.header("pragma", "no - cache");
    next()
});

router.use(session({
    secret: "admin-key",
    resave: false,
    saveUninitialized: false
}))

function adminLogged(req, res, next){
    if (req.session.isAdmin) {
        next()
    } else {
        res.redirect("/admin")
    }
}

router.get("/",(req,res)=>{
    console.log("admin signout")
    if(req.session.isAdmin){
        console.log("admin logged")
        res.redirect("/admin/logged/${req.session.name}")
    }else{
        adminNot=req.query.adminNot
        passNot=req.query.passNot
        console.log("admin signout")
        res.render("adminLogin",{adminNot,passNot})
    }
})



router.post("/submit",admin.checkAdmin)

router.get("/logged/:username",adminLogged,async (req,res)=>{
    console.log("adminpannel")
    const userDetails=await admin.listUser()
    res.render("adminPannel",{welcome:req.session.name,userDetails})
})

router.post("/logged/:name",admin.searchUser)

router.get("/edit",adminLogged,(req,res)=>{
    oldUserName=req.query.username
    oldEmail=req.query.email
    console.log(oldUserName)
    const userfound=req.query.morethanUser
    console.log("old username not found")
    res.render("editUser",{oldUserName,oldEmail,userfound})
})

router.post("/edit/:name",admin.editUser)

router.get("/delete/:name",admin.deleteUser)

router.get('/signout', admin.signOut)

router.get("/error",(req,res)=>{
    const errorMessage=req.query.message
    res.render("error",{errorMessage})
})

module.exports = router