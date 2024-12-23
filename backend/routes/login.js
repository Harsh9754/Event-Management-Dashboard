const express = require('express');
const UserModel=require("../models/admin")
const generateToken=require("../Config/generateToken");
const User = require('../models/admin');
const router = express.Router();


router.post("/login",async (req, res) => {
        console.log(req.body);
        const { name, password } = req.body;
      
        const user = await UserModel.findOne({ name });
      
        console.log("fetched user Data", user);
        // console.log(await user.matchPassword(password));
        if (user) {
            if(await user.matchPassword(password)){

                const response = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                };
                console.log(response);
                res.status(200).json({response});
            }else{
                res.status(401).json({message: "Password Incorrect"});
            }
        } else {
          res.status(401).json({message:"User NOt exists"});
          }

})

  router.post("/signup",async(req, res) => {
    // Registration
    const { name, email, password } = req.body;
    console.log(req.body);
    // check for all fields
    if (!name || !email || !password) {
      res.status(400);
    //   throw Error("All necessary input fields have not been filled");
    }
  
    // pre-existing user
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.status(405);
    //   throw new Error("User already Exists");
    }
  
    // userName already Taken
    const userNameExist = await UserModel.findOne({ name });
    if (userNameExist) {
      res.status(406);
    //   throw new Error("UserName already taken");
    }
  
    // create an entry in the db
    const user = await UserModel.create({ name, email, password });
    console.log(user);
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json();
    //   throw new Error("Registration Error");
    }

  })

  module.exports = router;
  
  