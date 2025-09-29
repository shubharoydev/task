const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Team', teamSchema);