const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://inder_userapp:UqDRiI7TZkXwwNTj@tinder.djrjfuj.mongodb.net/devTinder");
}



module.exports = { connectDB };