require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../lib/prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        //User email given by google.
        const email = profile.emails[0].value;

        // check if user already exists if it doesn't create a new user
        let user = await prisma.user.findUnique({
          where: { email },
        });

        //If no display name make it the start of the email
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              username: profile.displayName || email.split("@")[0],
              role: "user",
            },
          });
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
