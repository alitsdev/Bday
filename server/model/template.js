const mongoose = require('./');
const Schema = mongoose.Schema;
const templateSchema = new Schema({
  host: String,
  background: String,
  stickers: [
    {
      type: String,
    },
  ],
  name: String,
  date: Date,
  address: String,
  message: String,
});
const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
