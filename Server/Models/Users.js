'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Mongoose schema for Users object.
 */

 let UserSchema=new Schema({
     Username:{
         type:String,
         required:"username is required"
     },
     Email:{
         type:String,
         required:"email is required",
         unique: true
     },
     password:{
         type:String,
         required:"password is required",
         minLength:[6,'Password length is not permitted to less than 6']
     },
     bio:{
         type:String
     },
     location:{
         type:String
     },
     sex:{
         type:String,
         enum:['male','female','secrete']
     },
     profileImage:{
        type:String,
    }

 });