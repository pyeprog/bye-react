const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/pyedora';

mongoose.Promise = global.Promise;
mongoose.connect(db);

module.exports = {mongoose};
