const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const UserModel = require("../models/UserModel");
const router = express.Router() ;

router.get("/",async(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","signup.html"));
})

router.post("/",async(req,res)=>{
   try{
        const { confirmpassword, ...payload } = req.body;
        console.log(payload);
        const newUser = new UserModel(payload);
        await newUser.save();
        res.status(200).send("Succesfully registered");
   }catch(error){
    console.error("Error while registering user:", error);
    res.status(500).send("Error while registering User");
   }

})

module.exports = router ;

