const { userClient } = require('../services/rpcClient.services');

exports.getUser = (req, res) => {
    const { id } = req.params;
    userClient.getUserById({ id }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.user);
    });
};

exports.searchUser = (req, res) => {
    userClient.searchUser({ name: req.query.name }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.users);
    });
};
