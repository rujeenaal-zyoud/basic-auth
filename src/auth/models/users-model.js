'use strict'
//here we will create te schema for data base and the model 

// 3'rd party dependencies or libraries
const mongoose = require('mongoose');

//create the schema for our auth
const userSchema = mongoose.Schema({
    username:{ type :String , required :true},
    password:{ type :String , required :true}

});

//creat the model for schema

const Users = mongoose.model('user',userSchema);


module.exports =Users ;