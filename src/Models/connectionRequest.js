const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
fromUserId:{
    type:mongoose.Types.ObjectId,
    ref:"User", //refrecne to the user
    required:true
},
toUserId:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:"User"
},
status:{
    type:String,
    enums:{
        value:["pending","accepted","rejected","ignored","intrested"],
        message:`{VALUE} is not supported`
    },
    required:true,
}

},{timestamps:true});

connectionRequestSchema.pre("save", async function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send a connection request to yourself");
    }
   
})

 connectionRequestSchema.index({fromUserId:1, toUserId:1}, {unique:true});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = { ConnectionRequestModel }