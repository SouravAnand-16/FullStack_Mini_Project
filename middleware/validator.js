const UserModel = require("../models/UserModel");

const validator = async(req,res,next)=>{
      try{
          const {email} = req.body ;
          console.log(email);
          const user = await UserModel.findOne({email});
          console.log(user);
          if(!user){
            next();
          }else{
            res.status(500).send({message:`User already registered with ${email}`});
          }
      }catch(error){
        res.status(500).send({message:"Cannot registerd"});
      }
      
}

module.exports = validator ;