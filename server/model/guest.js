const mongoose = require('./');
const Schema = mongoose.Schema;
const guestSchema = new Schema({
  name: String,
  email: String,
  host: String, //user id
  invitationSent: {type: Boolean, default: false},
  confirmed: {type: Boolean, default: false}
});
const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
