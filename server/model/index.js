const mongoose = require('mongoose');
const conf = require('../config')

mongoose.connect(`mongodb://localhost:27017/${conf.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;