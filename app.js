var express=require("express")
const session=require("express-session")


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"session key",
    resave:false,
    saveUninitialized:true
}))
app.set("view engine","hbs");
var userRoute=require("./routes/user");
var adminRoute=require("./routes/admin");

app.use('/',userRoute)
app.use('/user',userRoute)
app.use('/admin',adminRoute)


app.listen(3003,()=>{
    console.log("server started on port 3000")
});
module.exports=app;
