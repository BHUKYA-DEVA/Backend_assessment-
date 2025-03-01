const { discussionClient } = require('../services/rpcClient.services');

exports.createDiscussion = (req, res) => {
    discussionClient.createDiscussion(req.body, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.status(201).send(response.discussion);
    });
};

exports.updateDiscussion = (req, res) => {
    discussionClient.updateDiscussion({ id: req.params.id, ...req.body }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.discussion);
    });
};

exports.deleteDiscussion = (req, res) => {
    discussionClient.deleteDiscussion({ id: req.params.id }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response);
    });
};

exports.getDiscussion = (req, res) => {
    discussionClient.getDiscussion({ id: req.params.id }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.discussion);
    });
};

exports.searchDiscussionsByTag = (req, res) => {
    discussionClient.searchDiscussionsByTag({ tag: req.query.tag }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.discussions);
    });
};

exports.searchDiscussionsByText = (req, res) => {
    discussionClient.searchDiscussionsByText({ text: req.query.text }, (error, response) => {
        if (error) return res.status(400).send(error.details);
        res.send(response.discussions);
    });
};
