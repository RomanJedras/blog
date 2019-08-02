const express = require('express');


const PostController = require('../controllers/post.controller');

const router = express.Router();

// get all posts
router.route('/posts').get(PostController.getPosts);
router.route('/posts/:id').get(PostController.getPost);
router.route('/posts').post(PostController.addPost);
router.route('/posts/:id').put(PostController.editPost);
module.exports = router;