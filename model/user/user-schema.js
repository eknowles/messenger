const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: {type: String, required: true, index: true, unique: true},
  firstName: {type: String},
  lastName: {type: String},
  avatar: {type: String},
  mobile: {type: String},
  email: {type: String},
  accountNumber: {type: String},
  timezone: {type: String},
  gender: {type: String},
  locale: {type: String},
  admin: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  messageCount: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);
