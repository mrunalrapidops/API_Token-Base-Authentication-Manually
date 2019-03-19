const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
//connection 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AAuth',{ useCreateIndex: true,useNewUrlParser: true });
const app = express();
//Middelware
app.use(morgan('dev'));
app.use(bodyParser.json());
//Routes
app.use('/users',require('./routes/users'));//=>ttp://localhost:8080"/users"/signup
//Start server
const  port = 8080;
app.listen(port);
console.log(`Server listen on ${port}`);