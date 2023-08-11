const localStrategy = require('passport-local').Strategy
const User = require("./models/registration.js");
exports.initializingPassport = (passport) => {
    passport.use(new localStrategy({usernameField:'email',passwordField:'password'},async (username, password, done) => {
        try {
            const user = await User.findOne({email:username})
            if(!user){
                return done(null,false,{message:"User not found"})
            }
            if(user.password !== password){
                return done(null,false,{message:"Incorrect password"})
            }
            return done(null,user)  
        } catch (error) {
            return done(error,false) 
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    });
}