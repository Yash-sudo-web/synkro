const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy; 
const User = require("./models/registration.js");
const passport = require('passport');
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

exports.googlePassport = (passport) => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/user/google/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
              return cb(null, user);
            }
            try {
                const newUser = await User.create({
                    googleId: profile.id,
                    userName: profile.displayName,
                    email: profile.emails[0].value,
                });
                return cb(null, newUser);
            } catch (error) {
                console.log(error);
                return cb(error);
          }
        }
      )
    );
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

exports.facebookPassport = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/api/user/facebook/callback",
        profileFields: ['id', 'emails', 'name']
      },
      async (accessToken, refreshToken, profile, cb) => {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          return cb(null, user);
        }
        try {
            const newUser = await User.create({
                facebookId: profile.id,
                userName: profile.displayName,
                email: profile.emails[0].value,
            });
            return cb(null, newUser);
        } catch (error) {
            console.log(error);
            return cb(error);
      }
    }
    ));
}