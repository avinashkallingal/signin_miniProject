const user=require("../models/userModel")
const bcrypt=require("bcrypt")


//checking is admin is valid, isAdmin value is 1 or not,making session if valid
const checkAdmin=async (req,res)=>{
    try{
        const adminIn=await user.findOne({username:req.body.username})
        if(adminIn){
            const adminPass=await bcrypt.compare(req.body.password,adminIn.password)
            if(adminPass){
                if(adminIn.isAdmin==1){
                    console.log("admin found")
                    req.session.isAdmin=true
                    req.session.name=req.body.username
                    res.redirect("/admin/logged/${req.session.name}")

                }else{
                    console.log("admin not found")
                    res.redirect("/admin?adminNot=not authorized")
                }
            }else{
                console.log("invalid admin password")
                res.redirect("/admin?passNot=not authorized")
            }
        }else{
            console.log("invalid username")
            res.redirect("/admin/error?message=somthing went wrong")
        }
    }catch(e){
        console.log(e.message)
        res.redirect("/admin/error?message=something went wrong")
    }
}

//listing all users in the database
const listUser=async (req,res)=>{
    try{
     const allUsers=await user.find({isAdmin:0})
     if(allUsers){
        return allUsers
     }else{
        console.log("user details not found")
     }
    }catch(e){
        console.log(e.message)
        res.redirect("/admin/error?message=something went wrong!")
    }
}

//editing users
const editUser=async (req,res)=>{
    try{
        console.log("cant fetch data")
        console.log(req.body.username)
        console.log(req.body.oldusername)
        const moreUser=await user.find({username:req.body.username}).countDocuments()
        if(moreUser==0){
            await user.updateOne({username:req.body.oldusername},{$set:{username:req.body.username}})
            await user.updateOne({email:req.body.oldemail},{$set:{email:req.body.email}})
            res.redirect("/admin/logged/${req.session.name}")
        }else{
            res.redirect("/admin/edit?morethanUser=more than one usernameFound")
        }
    }catch(e){
        console.log(e.message)
        res.redirect("admin/error?message=something went wrong")
    }
}

//searching specified user,and make it as regex
const searchUser=async(req,res)=>{
    try{
        welcome=req.session.name
        console.log(req.body.userfind)
        if(req.body.userfind){
            console.log("1")
            userFind=req.body.userfind
            console.log("2")
            console.log(userFind)
         
            const regex=new RegExp(`^${userFind}`)
            console.log(regex)
            console.log("3")
            const userSearch=await user.find({username:{$regex:regex}})
            console.log(userSearch)
            console.log(welcome)
            console.log(req.session.name)
            res.render("adminPannel",{userDetails:userSearch,welcome,searchedValue:userFind})
        }else{
            console.log(req.session.name)
            console.log("found")
            res.redirect("/admin/logged/${req.session.name}")
        }
    }catch(e){
        console.log(e.message)
        res.redirect("admin/error?message=something went wrong")
    }
}

//deleting users
const deleteUser=async (req,res)=>{
    try{
        console.log("userdeleted successful"+req.query.username)
        console.log("user not found")
        await user.deleteOne({username:req.query.username})
        res.redirect("/admin/logged/${req.session.name}")
    }catch(e){
        console.log(e.message)
        res.redirect("/admin/error?message=something went wrong")
    }
}


const signOut=async (req,res)=>{
    await req.session.destroy()
    console.log("admin session destroyed")
    res.redirect("/admin")
}

module.exports={checkAdmin,listUser,editUser,deleteUser,searchUser,signOut}