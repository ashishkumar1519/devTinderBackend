const express = require('express');
const { userAuth } = require('../middlewares/auth');
const profileRouter = express.Router();
const { isValidateEditProfileData } = require('../utils/validation'); 
const bcrypt = require('bcrypt');

profileRouter.get("/profile", userAuth, async (req,res)=>{
   try{
       const user = req.user;
       const { firstname, lastname, email, age, gender, photoUrl, about, skills } = user;
        res.send({ firstname, lastname, email, age, gender, photoUrl, about, skills }); 
   }

   catch(err){
    res.status(500).send("Err " + err.message);
   }
  
})

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!isValidateEditProfileData(req)){
            throw new Error("Invalid fields in request body");
        }

        const loggedUser = req.user;
       
        Object.keys(req.body).forEach((field)=>{
            loggedUser[field] = req.body[field];
        })
         
        const updateUser = await loggedUser.save();
        
        res.json({message: "Profile updated successfully", user: updateUser});

    }
    catch(err){
        res.status(500).send("Err " + err.message);
     }
})

profileRouter.patch("/profile/edit/passwordChange",userAuth, async (req,res)=>{
      try{
         const {oldPassword, newPassword} = req.body;//[current api request body]
         const loggedUser = req.user; //[data model user after logged in]
         const isValidPassword = await loggedUser.IsvalidatePassword(oldPassword);
         if(!isValidPassword){
            return res.status(400).send("Old password is incorrect");
         }
         loggedUser.password  = await bcrypt.hash(newPassword, 10);
         await loggedUser.save();
         res.send("Password updated successfully" + loggedUser.firstname);
      }

      catch(err){
        res.status(500).send("Err " + err.message);
      }

})

module.exports = profileRouter;