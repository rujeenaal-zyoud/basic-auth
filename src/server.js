'use strict';

// 3'rd party dependencies or libraries
const express =require('express');

const router = require('./auth/router');
// Prepare the express server
const server =express();

// using it for make the JSON input and output on request in json 
server.use(express.json());


// Process FORM intput and put the data on req.body
server.use(express.urlencoded({ extended: true }));
server.use(router)

module.exports =server;



