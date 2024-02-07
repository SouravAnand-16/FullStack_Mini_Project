const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const UserModel = require("../models/UserModel");
const validator = require("../middleware/validator");
const router = express.Router() ;

router.get("/signup",async(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","signup.html"));
})

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","login.html"));
})

router.post("/signup",validator,async(req,res)=>{
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

router.post("/login",async(req,res)=>{
   try{
       const {email,password} = req.body ;
       const user = await UserModel.findOne({email});
       if(!user){
           res.status(500).send(`<h1>Not a valid user.</h1><h3>Please Signup first!</h3><a href="/user/signup">Signup</a>`);
       }else{
        res.status(200).send(`
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f0f0f0;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: #007bff;
                margin-bottom: 20px;
            }
            p {
                font-size: 18px;
                margin-bottom: 20px;
            }
            .username {
                color: red;
            }
        </style>
        <div class="container">
            <h1>Welcome back <span class="username">${user.username}</span>!</h1>
            <p>How can we help you?</p>
        </div>
    `);
     
       }
   }catch(error){
        console.log(error);
   }

})

module.exports = router ;

