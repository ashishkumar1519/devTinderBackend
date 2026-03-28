const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');

const userAuth = async (req,res,next)=>{
  try{
     const {token} = req.cookies;
     if(!token){
        return res.status(401).send("Please Login");
     }
   const decodedToken = jwt.verify(token, "secretkey");
   
   const { _id} = decodedToken;
    const user = await UserModel.findById(_id).exec();

        if(!user){
            return res.status(404).send("User not found");
        }
        req.user = user;
        next();
  }
  catch(err){
    res.status(400).send("Error: " + err.message);
  } 

}
module.exports = { userAuth }