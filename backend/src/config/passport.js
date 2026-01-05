require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../lib/prisma");

const { signToken } = require("../utils/jwt");

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_id,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  })
);
