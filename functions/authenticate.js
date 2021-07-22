import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';

import UserModel from '../models/userModel';

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.secret;

const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
    const user = await UserModel.findByUserName(payload);
    (user) ? next(null, user) : next(null, false);
});

passport.use(strategy);

export default passport;