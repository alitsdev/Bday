const mongoose = require('mongoose');
const conf = require('../config')

mongoose.connect(conf.dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose;