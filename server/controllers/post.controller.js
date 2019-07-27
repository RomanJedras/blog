const Post = require('../models/post.model');
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