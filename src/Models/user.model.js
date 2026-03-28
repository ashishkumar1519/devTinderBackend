
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");   
const userSchema = new mongoose.Schema(

    {

        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true 
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            
        },
        gender:{
            type:String,
           enums:   {
            values:["male","female","other"],
            message :`{VALUE} is not supported`
           }
        },
        photoUrl :{
            type:String,
        },
        about:{
            type:String,
            default:"testing default user about"
        },
        skills:{
            type:[String]
        }
    },
{
    timestamps:true

}
)

userSchema.methods.getJwt = async function(){
    const user  = this;
    const token = await jwt.sign({_id: user._id}, "secretkey",{expiresIn: "1h"});
    return token;
}

userSchema.methods.IsvalidatePassword = async function(passwordbyUser){
    const user = this;
    const hashPassword = user.password;
    const isValidPassword = await bcrypt.compare(passwordbyUser, hashPassword);
    return isValidPassword;
}

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel }; 