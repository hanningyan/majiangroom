/*!
 * todo - common/db.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */


var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.db);

var Schema = mongoose.Schema , ObjectId = mongoose.ObjectId;

var UserSchema = new Schema({
	username:  { type:String, default: 'null' ,index: true, unique:true}
  , password:  { type:String, default:'-1'}    
}) ;

var PlayerSchema = new Schema({
    name  :   { type:String, default: 'null' ,index: true,unique:true}
  , table_id: { type:Number, default:'-1'}    
  , date  :   { type:Date, default: Date.now }
});

var TableSchema = new Schema({	
    description:	{ type: String, default: 'null' }     //台子的描述
   ,price		:	{ type: Number, default: '10'}
   ,priceper	:	{ type: String, default: '小时'}
});



var Player = mongoose.model('player',PlayerSchema);
var Table = mongoose.model('table',TableSchema);
var User  = mongoose.model('user',UserSchema);

exports.Player = Player;
exports.Table = Table;
exports.User= User;