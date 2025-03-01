const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const userController = require('../controllers/user.controller');

const USER_SERVICE_GRPC_PORT = process.env.USER_SERVICE_GRPC_PORT || 50051;

const PROTO_PATH = __dirname + '/../protos/user.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const startRPCServer = () => {
    const server = new grpc.Server();
    server.addService(userProto.UserService.service, {
        getUserById: userController.getUserById,
        createUser: userController.createUser,
        updateUser: userController.updateUser,
        deleteUser: userController.deleteUser,
        searchUser: userController.searchUser,
        followUser: userController.followUser,
        unfollowUser: userController.unfollowUser,
        login: userController.login,
        signup: userController.signup,
        listUsers: userController.listUsers,
    });
    server.bindAsync(`0.0.0.0:${USER_SERVICE_GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`✅ User service gRPC server running on port ${port}`);
    });
};

module.exports = { startRPCServer };
