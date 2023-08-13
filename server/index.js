require("dotenv").config();
const cookieSession = require("cookie-session");
const user = require("./routes/user");
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const app = express();
const port = 5000;
const connectMongoose = require("./db.js");
const { initializingPassport, googlePassport } = require("./passportConfig");

connectMongoose();
initializingPassport(passport);
googlePassport(passport);
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}));
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

