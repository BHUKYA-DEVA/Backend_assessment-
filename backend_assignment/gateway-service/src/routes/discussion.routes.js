const express = require('express');
const authController = require('../controllers/auth.controller');
const discussionController = require('../controllers/discussion.controller');

const router = express.Router();

router.post('/', authController.authenticate, discussionController.createDiscussion);
router.get('/searchByTag', authController.authenticate, discussionController.searchDiscussionsByTag);
router.get('/searchByText', authController.authenticate, discussionController.searchDiscussionsByText);
router.get('/:id', authController.authenticate, discussionController.getDiscussion);
router.patch('/:id', authController.authenticate, discussionController.updateDiscussion);
router.delete('/:id', authController.authenticate, discussionController.deleteDiscussion);

module.exports = router;
