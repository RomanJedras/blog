const express = require('express');


const PostController = require('../controllers/post.controller');

const router = express.Router();

// get all posts
router.route('/posts').get(PostController.getPosts);
router.route('/posts/:id').get(PostController.getPost);
router.route("/post/random").get(PostController.getRandomPost);
router.route('/posts').post(PostController.addPost);
router.route('/posts/:id').put(PostController.editPost);
router.route('/posts/range/:startAt/:limit').get(PostController.getPostsByRange);
module.exports = router;