require("dotenv").config();
const user = require("./routes/user");
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const app = express();
const port = 5000;
const connectMongoose = require("./db.js");
const { initializingPassport } = require("./passportConfig");

connectMongoose();
initializingPassport(passport);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(expressSession({secret: "secret", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", user);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

