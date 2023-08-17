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
    res.json({token:req.user._id,success:true})
})

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), (req, res)=> {
    res.redirect('http://localhost:3000/redirect?Id='+req.user._id);
});
router.get('/facebook',passport.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000' }), function(req, res) {
    res.redirect('http://localhost:3000/redirect?Id='+req.user._id);
  });

router.get('/getUser/:friendId', async (req, res) => {
    const user = await User.findOne({_id:req.params.friendId})
    res.status(200).send(user)
})
module.exports = router;