const express = require('express');
const router = express.Router();
const User  = require('../models/registration.js');
const passport = require('passport');

router.post('/register', async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    try {
        const newUser = await User.create(
            {
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password
            }
        )
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured")
    }
})
router.post('/login',passport.authenticate("local"), async (req, res) => {
    res.send("Logged in")
})

module.exports = router;