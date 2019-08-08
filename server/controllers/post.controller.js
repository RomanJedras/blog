const Post = require('../models/post.model');
const uuid = require('uuid');

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

exports.editPost = async (req,res) => {
	try {
		const { title, author, content } = req.body;
		const postUpdate = await Post.findByIdAndUpdate(req.params.id,{ $set: {
			title: title,
			author : author,
			content: content,
			updated_at: new Date()
		}});
		res.status(200).json(postUpdate);
	}catch(error) {
		res.status(400).json({
			'status':'fail',
			'messages': error  //On production should be Invalid data send
		});
	}
};


exports.getPostsByRange = async (req, res) => {
	try {
		let {startAt, limit} = req.params;
		startAt = parseInt(startAt);
		limit = parseInt(limit);
		const posts = await Post.find().skip(startAt).limit(limit);
		const amount = await Post.countDocuments();
		res.status(200).json({
			posts,
			amount,
		});
	}catch (err){
		res.status(500).json(err);
	}
};

exports.getRandomPost = async (req, res) => {
	
	try {
		const count = await Post.countDocuments();
		const rand = Math.floor(Math.random() * count);
		return res.status(200).json(await Post.findOne().skip(rand));
	} catch(err) {
		return res.status(500).json(err);
	}
};

