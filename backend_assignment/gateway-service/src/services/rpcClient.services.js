const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const USER_PROTO_PATH = __dirname + '/../protos/user.proto';
const DISCUSSION_PROTO_PATH = __dirname + '/../protos/discussion.proto';

const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const userProto = grpc.loadPackageDefinition(userPackageDefinition).user;

const discussionPackageDefinition = protoLoader.loadSync(DISCUSSION_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const discussionProto = grpc.loadPackageDefinition(discussionPackageDefinition).discussion;

const userClient = new userProto.UserService(`user-service:${process.env.USER_SERVICE_GRPC_PORT}`, grpc.credentials.createInsecure());
const discussionClient = new discussionProto.DiscussionService(`discussion-service:${process.env.DISCUSSION_SERVICE_GRPC_PORT}`, grpc.credentials.createInsecure());

module.exports = {
    userClient,
    discussionClient
};
