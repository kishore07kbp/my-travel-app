const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: false, transform: (_, ret) => { delete ret.password; return ret; } }
});

module.exports = mongoose.model('User', userSchema); 