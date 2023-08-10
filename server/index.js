require("dotenv").config();
const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();
const port = 5000;
const  connectMongoose  = require("./db.js");
app.use(cookieSession({ 
    name: 'session',
    keys: ["jaeifl"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
connectMongoose();
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

