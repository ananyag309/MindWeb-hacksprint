const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

progressSchema.index({ userId: 1 }); // Index userId for fast lookups

module.exports = mongoose.model('Progress', progressSchema);
