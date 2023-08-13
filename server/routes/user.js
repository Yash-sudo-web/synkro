const express = require('express');
const router = express.Router();
const User  = require('../models/registration.js');
const passport = require('passport');
const app = express();
const cors = require('cors');
app.use(cors());
router.post('/register', async (req, res) => {
    const user = await User.findOne({email:req.body.emailreq})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    try {
        const newUser = await User.create(
            {
                userName:req.body.userName,
                email:req.body.emailreq,
                password:req.body.password,
                phoneNumber:req.body.phoneNumber,
                dateOfBirth:req.body.dateOfBirth,
                gender:req.body.gender,
                location:req.body.location
            }
        )
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error occured")
    }
})
router.post('/login',passport.authenticate("local"), async (req, res) => {
    res.json("Logged in")
})

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), async (req, res)=> {
    res.redirect('http://localhost:3000/app?Id='+req.user._id);
});

module.exports = router;