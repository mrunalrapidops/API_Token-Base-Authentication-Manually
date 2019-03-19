const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration');
const User = require('./Models/users');
// json webtoken strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
} ,async(payload,done)=>{
    try{
    //find user token
    const user = await User.findById(payload.sub);
    // if user don't exists ,handle it
    if(!user){
        return done(null,false);
    }
    //return original user
     done(null,user); 
    }catch(error){
        done(error,false);
    }
}));
//local strategy
passport.use(new LocalStrategy({usernameField:'email'},
    async(email, password, done) =>{
    const user =  await User.findOne({email});
    if (!user) { return done(null, false); }
    const isMatch = await user.verifyPassword(password);
    if(!isMatch){ return done(null, false); }
    return done(null, user);
    }
  ));