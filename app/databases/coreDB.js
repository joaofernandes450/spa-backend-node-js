var mongoose = require('mongoose');
var config = require('../../config');
var mongoConn = new mongoose.Mongoose();

mongoConn.connect(config.coreDB, { useNewUrlParser: true })
module.exports = exports = mongoConn;