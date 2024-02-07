const UserModel = require("../models/UserModel");
const express = require("express");
const path = require("path");


const validator = async(req,res,next)=>{
      try{
          const {email} = req.body ;
          console.log(email);
          const user = await UserModel.findOne({email});
          console.log(user);
          if(!user){
            next();
          }else{
           res.status(200).send(`<style>
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
           }
           h1, h3 {
               text-align: center;
           }
           a {
               color: #007bff;
               text-decoration: none;
           }
           a:hover {
               text-decoration: underline;
           }
       </style>
       <div class="container">
           <h1>User already exists with</h1>
           <a href="mailto:${email}">${email}</a>
           <h3>Please do Login <a href="/user/login">Login</a></h3>
       </div>`);
          }
      }catch(error){
        res.status(500).send({message:"Cannot registerd"});
      }
      
}

module.exports = validator ;