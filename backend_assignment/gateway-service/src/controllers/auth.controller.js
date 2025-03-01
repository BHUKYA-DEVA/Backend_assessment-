const jwt = require('jsonwebtoken');
const { userClient } = require('../services/rpcClient.services');

const secretKey = process.env.JWT_SECRET_KEY;

exports.login = (req, res) => {
    userClient.login(req.body, (error, response) => {
        if (error) return res.status(400).send('Invalid email or password');
        const token = jwt.sign({ id: response.user.id }, secretKey, { expiresIn: '1h' });
        res.send({ token });
    });
};

exports.signup = (req, res) => {
    userClient.signup(req.body, (error, response) => {
        if (error) return res.status(400).send(error.details);
        const token = jwt.sign({ id: response.user.id }, secretKey, { expiresIn: '1h' });
        res.status(201).send({ token });
    });
};

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};
