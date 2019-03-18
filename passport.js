const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration');
const User = require('./Models/users');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
} ,async(payload,done)=>{
    try{
    //find user token
    const user = await User.findById(payload.sub);
    if(!user){
        return done(null,false);
    }
     done(null,user);
    }catch(error){
        done(error,false);
    }
}));