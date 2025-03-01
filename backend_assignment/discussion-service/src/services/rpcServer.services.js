const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const discussionController = require('../controllers/discussion.controller');

const DISCUSSION_SERVICE_GRPC_PORT = process.env.DISCUSSION_SERVICE_GRPC_PORT || 50052;

const PROTO_PATH = __dirname + '/../protos/discussion.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const discussionProto = grpc.loadPackageDefinition(packageDefinition).discussion;

const startRPCServer = () => {
    const server = new grpc.Server();
    server.addService(discussionProto.DiscussionService.service, {
        createDiscussion: discussionController.createDiscussion,
        updateDiscussion: discussionController.updateDiscussion,
        deleteDiscussion: discussionController.deleteDiscussion,
        getDiscussion: discussionController.getDiscussion,
        searchDiscussionsByTag: discussionController.searchDiscussionsByTag,
        searchDiscussionsByText: discussionController.searchDiscussionsByText,
        likeDiscussion: discussionController.likeDiscussion,
        commentDiscussion: discussionController.commentDiscussion,
        replyComment: discussionController.replyComment,
        likeComment: discussionController.likeComment,
    });
    server.bindAsync(`0.0.0.0:${DISCUSSION_SERVICE_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`✅ Discussion service gRPC server running on port ${port}`);
    });
};

module.exports = { startRPCServer };
