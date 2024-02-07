const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connection = require("./connection")
const router = require("./routes/user");
const validator = require("./middleware/validator");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.use("/user",router);

app.listen(3000,async()=>{
    try{
        await connection;
        console.log("connected to Database");
        console.log(`Server is runnig at http://localhost:${3000}`);
    }catch(error){
        console.log(error);
    }
})