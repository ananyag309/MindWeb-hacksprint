const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

moodSchema.index({ userId: 1, date: 1 }, { unique: true }); // Prevents duplicate moods on the same date

module.exports = mongoose.model('Mood', moodSchema);
