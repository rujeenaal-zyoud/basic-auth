'use strict';

require('dotenv').config();
//local dependencies
const server =require('./src/server');
const PORT = process.env.PORT;
const MONGODB_URI =`mongodb://localhost:27017/Oauth`; 

// 3'rd party dependencies or libraries
const mongoose = require('mongoose');


mongoose.connect(MONGODB_URI ,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    })
    //if true connected so will listen
    .then(()=>{
        server.listen(PORT,()=>
       console.log(` The server UP and listening on Port ${PORT}`) )
    })
    .catch((e)=>{
        console.error(e.message)
    })