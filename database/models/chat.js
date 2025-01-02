const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

chatSchema.index({ user: 1, timestamp: -1 }); // Index user and timestamp for faster queries

module.exports = mongoose.model("Chat", chatSchema);
