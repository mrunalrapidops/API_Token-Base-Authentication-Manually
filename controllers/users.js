const JWT = require('jsonwebtoken');
const User = require('../Models/users');
const { JWT_SECRET } = require('../configuration');
signToken = user =>{
    return JWT.sign({
        iss:'Mrunal',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)
    },JWT_SECRET);//payload{iss->issuer,exp->expresion time,sub->subject    },secret 
    
}
module.exports = {
    signUp: async(req,res,next)=>{
        console.log("UsersController.signUp() called");
        const {email,password} = req.value.body;
        //-> same Email?
        const foundUser = await User.findOne({ email})
        if(foundUser){
            return res.status(403).json({error:'User Already Exist'})
        }   
        //-> Create new User
        const newUser = new User({ email,password});
        await newUser.save();
        //genrate token
        const Token = signToken(newUser);
        //Give Token
        res.status(200).json({Token});
    },
    signIn: async(req,res,next)=>{
        //Genrate Tokens
        console.log("signIn successfully");
    },
    secret: async(req,res,next)=>{
        console.log("UsersController.secret called");
    }
}