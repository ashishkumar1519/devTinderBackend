const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../Models/connectionRequest");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstname", "lastname", "about", "skills", "photoUrl"]);

    res.json({
      message: "Connection requests retrieved successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(500).send("Err " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstname", "lastname", "about", "skills", "photoUrl"])
      .populate("toUserId", ["firstname", "lastname", "about", "skills", "photoUrl"]);
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "Connection requests retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).send("Err " + err.message);
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should all user card except own card profile
    // his connections
    // ignored peoples
    // alredy sen connections

    const loggedInUser = req.user;
    // find all connection request
    let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit; // Set a maximum limit of 50
    const page = parseInt(req.query.page) || 1;
    const skipdata = (page - 1) * limit;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });   
  
    const hideUserFromFeed = new Set();
    connectionRequests.forEach((row) => {
     hideUserFromFeed.add(row.fromUserId.toString());
        hideUserFromFeed.add(row.toUserId.toString());

    });

    const userFeed = await UserModel.find({
      $and:[
        {_id:{$nin: Array.from(hideUserFromFeed)}},
        {_id:{$ne: loggedInUser._id}}

      ]
    }).select("firstname lastname gender age about skills photoUrl").skip(skipdata).limit(limit);

    res.send(userFeed);
  } catch (err) {
    res.status(500).send("Err " + err.message);
  }
});

module.exports = { userRouter };
