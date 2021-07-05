
//HERE WE WILL CREATE A BASIC FOR SIGN IN FUNCTION as middleware
'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');

const Users =require('../models/users-model');

async function basicAuthSignIn(req, res, next) {
    /*
       req.headers.authorization is : "Basic sdkjdsljd="
       To get username and password from this, take the following steps:
         - Turn that string into an array by splitting on ' '
         - Pop off the last value
         - Decode that encoded string so it returns to user:pass
         - Split on ':' to turn it into an array
         - Pull username and password from that array
     */


         let basicHeader = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
         //this line just to show the basicheader

    let encodedString = basicHeader.pop(); //  sdkjdsljd=
    // we want to sure there is a user or not
    //if (!headers[0] === 'Basic') next('Wrong Authorization headers');
    //now decodeing the encode that come from request and does'nt matter from ware
    let decodedString = base64.decode(encodedString);

    //spilt the header in password , username from :
    let [username, password] = decodedString.split(':');

    /*
       Now that we finally have username and password, let's see if it's valid
       1. Find the user in the database by username
       2. Compare the plaintext password we now have against the encrypted password in the db
          - bcrypt does this by re-encrypting the plaintext password and comparing THAT
       3. Either we're valid or we throw an error
     */
    try {
        const user = await Users.findOne({ username: username })
        const vaild = await bcrypt.compare(password, user.password)
        if (vaild) {
            res.status(200).json(user);
        }
        else {
            throw new Error('Invalid User');
        }
    }
    catch (error) {
        res.status(403).send(error);
    }
}


  module.exports= basicAuthSignIn;