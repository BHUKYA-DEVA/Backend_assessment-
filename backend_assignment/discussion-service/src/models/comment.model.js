const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    discussionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Discussion' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
