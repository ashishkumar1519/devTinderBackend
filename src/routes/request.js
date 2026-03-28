const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { ConnectionRequestModel } = require('../Models/connectionRequest');
const { UserModel } = require('../models/user.model');
const { connect } = require('mongoose');
const requestrouter = express.Router();

requestrouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored","interested"]


        const existUserID= await UserModel.findById(toUserId);
        if(!existUserID){
            return res.status(404).json({message: "User not found"});
        }
        
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status value: " + status});
        }
        //if there is already connection 
        const existingRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if(existingRequest){
            return res.status(400).json({message: "Connection request already exists"});
        }
        
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({message: "Connection request sent successfully", data});

    }
    catch(err){
        res.status(500).send("Err " + err.message);
    }
})

requestrouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{

    try{

        const loggedInUser = req.user;
        const {status, requestId    } = req.params;
        const allwowedStatus = ["accepted","rejected"];

        if(!allwowedStatus.includes(status)){
            return res.status(400).json({message:"invalid status value: " + status});
        }

           const connectionRequest = await ConnectionRequestModel.findById({
            _id: requestId,
            toUserId: loggedInUser._id,
            status:"interested"
           });

           if(!connectionRequest){
            return res.status(404).json({message: "Connection request not found"});
           } 

           connectionRequest.status = status;

           const data = await connectionRequest.save();
           
           res.json({message: "Connection request reviewed successfully", data});

        //validate status => status always interested 
        //validate requestId
        //


    }
    catch(err){
        res.status(500).send("Err " + err.message);
    }
})

module.exports = requestrouter;