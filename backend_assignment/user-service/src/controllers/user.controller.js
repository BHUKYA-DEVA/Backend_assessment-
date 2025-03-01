const User = require('../models/user.model');
const { getChannel } = require('../services/rabbitmqConfig');

const createUser = async (call, callback) => {
    try {
        const user = new User(call.request);
        await user.save();
        callback(null, { user: user.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const updateUser = async (call, callback) => {
    try {
        const user = await User.findByIdAndUpdate(call.request.id, call.request, { new: true, runValidators: true });
        if (!user) return callback(new Error('User not found'), null);
        callback(null, { user: user.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const deleteUser = async (call, callback) => {
    try {
        const user = await User.findByIdAndDelete(call.request.id);
        if (!user) return callback(new Error('User not found'), null);
        callback(null, {});
    } catch (error) {
        callback(error, null);
    }
};

const getUserById = async (call, callback) => {
    try {
        const user = await User.findById(call.request.id);
        if (!user) return callback(new Error('User not found'), null);
        callback(null, { user: user.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const listUsers = async (call, callback) => {
    try {
        const users = await User.find();
        callback(null, { users: users.map(user => user.toObject()) });
    } catch (error) {
        callback(error, null);
    }
};

const searchUser = async (call, callback) => {
    try {
        const users = await User.find({ name: new RegExp(call.request.name, 'i') });
        callback(null, { users: users.map(user => user.toObject()) });
    } catch (error) {
        callback(error, null);
    }
};

const followUser = async (call, callback) => {
    try {
        const user = await User.findById(call.request.userId);
        if (!user) return callback(new Error('User not found'), null);

        user.followers.push(call.request.followerId);
        await user.save();

        const channel = getChannel();
        channel.sendToQueue('user.follow', Buffer.from(JSON.stringify({
            userId: call.request.userId,
            followerId: call.request.followerId
        })));

        callback(null, {});
    } catch (error) {
        callback(error, null);
    }
};

const unfollowUser = async (call, callback) => {
    try {
        const user = await User.findById(call.request.userId);
        if (!user) return callback(new Error('User not found'), null);

        user.followers.pull(call.request.followerId);
        await user.save();

        const channel = getChannel();
        channel.sendToQueue('user.unfollow', Buffer.from(JSON.stringify({
            userId: call.request.userId,
            followerId: call.request.followerId
        })));

        callback(null, {});
    } catch (error) {
        callback(error, null);
    }
};

const login = async (call, callback) => {
    try {
        const user = await User.findOne({ email: call.request.email, password: call.request.password });
        if (!user) return callback(new Error('Invalid email or password'), null);
        callback(null, { user: user.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

const signup = async (call, callback) => {
    try {
        const user = new User(call.request);
        await user.save();
        callback(null, { user: user.toObject() });
    } catch (error) {
        callback(error, null);
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    listUsers,
    searchUser,
    followUser,
    unfollowUser,
    login,
    signup
};
