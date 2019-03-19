const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema =mongoose.Schema;
//creat Schema
const userSchema = new Schema({
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.pre('save',async function(next){
    try{
        // Genrate Salt
        const salt = await bcrypt.genSalt(10);
        // Genrate new secure password (hash + password) 
        const passwordhash = await bcrypt.hash(this.password,salt);
        //asign hashversion to original 
        this.password = passwordhash;
        next(); 
    }catch(error){
        next(error);
    }
});
userSchema.methods.isValidPasswords = async function(newPasswords){
    try{
         return await bcrypt.compare(newPasswords,this.password);
    }catch(error)
    {
        throw new Error(error)   
    }
}
//Create Model
const User = mongoose.model('user',userSchema)
//export model
module.exports = User;    







/*To Test
mongo
show dbs
show collections
db.users.find() */