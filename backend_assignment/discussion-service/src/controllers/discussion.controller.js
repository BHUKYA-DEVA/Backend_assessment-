const Discussion = require('../models/discussion.model');
const Comment = require('../models/comment.model');
const { getChannel } = require('../services/rabbitmqConfig');

const createDiscussion = async (call, callback) => {
    try {
        const discussion = new Discussion(call.request);
        await discussion.save();

        const channel = getChannel();
        channel.sendToQueue('discussion.create', Buffer.from(JSON.stringify(discussion)));

        callback(null, { discussion: discussion.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const updateDiscussion = async (call, callback) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(call.request.id, call.request, { new: true, runValidators: true });
        if (!discussion) return callback(new Error('Discussion not found'), null);

        const channel = getChannel();
        channel.sendToQueue('discussion.update', Buffer.from(JSON.stringify(discussion)));

        callback(null, { discussion: discussion.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const deleteDiscussion = async (call, callback) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(call.request.id);
        if (!discussion) return callback(new Error('Discussion not found'), null);

        const channel = getChannel();
        channel.sendToQueue('discussion.delete', Buffer.from(JSON.stringify({ id: call.request.id })));

        callback(null, {});
    } catch (error) {
        callback(error, null);
    }
};

const getDiscussion = async (call, callback) => {
    try {
        const discussion = await Discussion.findById(call.request.id);
        if (!discussion) return callback(new Error('Discussion not found'), null);

        discussion.viewCount += 1;
        await discussion.save();

        callback(null, { discussion: discussion.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const searchDiscussionsByTag = async (call, callback) => {
    try {
        const discussions = await Discussion.find({ tags: call.request.tag });
        callback(null, { discussions: discussions.map(discussion => discussion.toObject()) });
    } catch (error) {
        callback(error, null);
    }
};

const searchDiscussionsByText = async (call, callback) => {
    try {
        const discussions = await Discussion.find({ text: new RegExp(call.request.text, 'i') });
        callback(null, { discussions: discussions.map(discussion => discussion.toObject()) });
    } catch (error) {
        callback(error, null);
    }
};

const likeDiscussion = async (call, callback) => {
    try {
        const discussion = await Discussion.findById(call.request.id);
        if (!discussion) return callback(new Error('Discussion not found'), null);

        discussion.likes.push(call.request.userId);
        await discussion.save();

        const channel = getChannel();
        channel.sendToQueue('discussion.like', Buffer.from(JSON.stringify({
            discussionId: call.request.id,
            userId: call.request.userId
        })));

        callback(null, { discussion: discussion.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const commentDiscussion = async (call, callback) => {
    try {
        const comment = new Comment(call.request);
        await comment.save();

        const discussion = await Discussion.findById(call.request.discussionId);
        if (!discussion) return callback(new Error('Discussion not found'), null);

        discussion.comments.push(comment._id);
        await discussion.save();

        const channel = getChannel();
        channel.sendToQueue('discussion.comment', Buffer.from(JSON.stringify(comment)));

        callback(null, { comment: comment.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const replyComment = async (call, callback) => {
    try {
        const reply = new Comment(call.request);
        await reply.save();

        const comment = await Comment.findById(call.request.commentId);
        if (!comment) return callback(new Error('Comment not found'), null);

        comment.replies.push(reply._id);
        await comment.save();

        const channel = getChannel();
        channel.sendToQueue('discussion.reply', Buffer.from(JSON.stringify(reply)));

        callback(null, { reply: reply.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const likeComment = async (call, callback) => {
    try {
        const comment = await Comment.findById(call.request.id);
        if (!comment) return callback(new Error('Comment not found'), null);

        comment.likes.push(call.request.userId);
        await comment.save();

        const channel = getChannel();
        channel.sendToQueue('discussion.likeComment', Buffer.from(JSON.stringify({
            commentId: call.request.id,
            userId: call.request.userId
        })));

        callback(null, { comment: comment.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

module.exports = {
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    getDiscussion,
    searchDiscussionsByTag,
    searchDiscussionsByText,
    likeDiscussion,
    commentDiscussion,
    replyComment,
    likeComment
};
