const express = require('express');

const authrouter = express.Router();    
const bcrypt = require('bcrypt');
const { validationSingupData,validateLoginData } = require('../utils/validation');
const { UserModel } = require('../Models/user.model');

authrouter.post("/signup", async (req,res)=>{
   try{
    // valdiate user
        validationSingupData(req);
        const {password, firstname, lastname, email, age, gender} = req.body;
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user =new UserModel(
            {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                age,
                gender,
            }
        );
      const savedUser = await user.save();
         const token = await savedUser.getJwt();
            // add token  to cookie  and send response back to server
            res.cookie("token", token,{expires: new Date(Date.now() + 3600000), httpOnly: true});
            
        res.send({ message: "User registered successfully",data: savedUser });
   }
   catch(err){
    res.status(500).send("Err " + err.message);
   }
})

authrouter.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;
        validateLoginData(email);
        const userFind = await UserModel.findOne({email:email}).exec();
        if(!userFind){
            return res.status(400).send("user not found with this email");
        }
        const isValidPassword = await userFind.IsvalidatePassword(password);
       
        if(isValidPassword){
            // create jwt token
            const token = await userFind.getJwt();
            // add token  to cookie  and send response back to server
            res.cookie("token", token,{expires: new Date(Date.now() + 3600000), httpOnly: true});
            const { firstname, lastname, email: userEmail, age, gender, photoUrl, about, skills } = userFind;
            res.json({ firstname, lastname, email: userEmail, age, gender, photoUrl, about, skills });
        }
        else {
            res.status(400).send("Invalid pasword");
        }
    }
    catch(err){
        res.status(500).send("Err " + err.message);
    }
})

authrouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("Logout successful");
})

module.exports = authrouter;    