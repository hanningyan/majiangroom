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
var PlayerSchema = new Schema({
    name  :  { type: String, default: 'null' }
  , date  :  { type: Date, default: Date.now }
});
var Player = mongoose.model('player',PlayerSchema);

exports.Player = Player;