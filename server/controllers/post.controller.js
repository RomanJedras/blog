const Post = require('../models/post.model');
const uuid = require('uuid');
// get all posts

// exports.getPosts = function (req, res) {
// 	const data = [
// 		{ id: 1, title: 'Lorem Ipsum', content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit' },
// 		{ id: 2, title: 'Lorem Ipsum II', content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit' },
// 	]
// 	res.json(data);
// };

exports.getPosts = async (req, res) => {
	
	try {
		return res.status(200).json(await Post.find());
	} catch(err) {
		return res.status(500).json(err);
	}
	
};

exports.getPost = async (req, res) => {
	try {
		res.status(200).json(await Post.findById(req.params.id));
		
	} catch (error) {
		res.status(500).json({
			'status':'fail',
			'messages': error  //On production should be Invalid data send
		});
	}
};

exports.addPost = async (req,res) => {
	try {
		const { title, author, content } = req.body;
		
		let newPost = new Post();
		newPost.title = title;
		newPost.author = author;
		newPost.content = content;
		newPost.id = uuid();
		
		let postSaved = await newPost.save();
		res.status(200).json(postSaved);
		
	} catch(err) {
		res.status(500).json(err);
	}
};