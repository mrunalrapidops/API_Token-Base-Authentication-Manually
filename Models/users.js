const mongoose = require('mongoose');
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
//Create Model
const User = mongoose.model('user',userSchema)
//export model
module.exports = User;    







/*To Test
mongo
show dbs
show collections
db.users.find() */