
const express = require("express")
const session = require("express-session")
const userControl = require("../contollers/userControl")
const userDelete = require("../contollers/adminControl")


const router = express.Router()

router.use((req, res, next) => {
    res.header("Cache-Control", "private,no-cache,no-store,must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});
router.use(session({
    secret: "key-login",
    resave: false,
    saveUninitialized: false
}));

function userAuth(req, res, next) {
    if (req.session.isUserAuth) {
        next();
    }
    else {
        res.redirect("/")
    }
}
router.post('/submit', userControl.checkUserIn)

router.get("/wrong",userControl.checkUserOut)




router.get("/", (req, res) => {
    if(req.session.isUserAuth){
        res.redirect("/home/${req.session.username}")
    }
    else{
        invalidusername=req.query.errUser
        invalidpass=req.query.errPassword
        res.render("userLogin",{invalidpass,invalidusername})
    }

    // msg_show = req.query.msg;
    // res.render("userLogin", { msg_show });
})




router.get("/home/:username",userAuth,async(req, res) => {
   
   
    res.render("home",{Welcome:req.session.username});
})

router.get("/signup", (req, res) => {
    usernameFound=req.query.usernameFound
    emailmsg=req.query.message
    res.render("userSignup",{usernameFound,emailmsg});
})

router.post("/signup/adduser", userControl.addUser);


module.exports = router

