'use strict';


const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const base64 = require('base-64');
//local dependeces 
const basicAuthSignIn = require('./middleware/basic');
const Users = require('../auth/models/users-model');

// this for route methode 
let router = express.Router();

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', async(req,res)=>{

try{


  req.body.password = await bcrypt.hash(req.body.password,10);

  const user = new Users(req.body);
  const record = await user.save(req.body);
  res.status(200).json(record);  

}
catch(e){
    res.status(403).send(e);
    
}

})




// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post ('/signin',basicAuthSignIn,(req,res)=>{})

module.exports=router;