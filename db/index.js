const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/realtimeChat');
mongoose.Promise = global.Promise;

module.exports = mongoose;