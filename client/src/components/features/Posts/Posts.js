import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';


class Posts extends Component {
	
	componentDidMount() {
		const { loadPosts } = this.props;
		loadPosts();
	}
	
	
	
	render () {
		const { posts } = this.props;
		console.log(this)
		return (
			<div>
				<PostsList posts={posts} />
			</div>
		);
	}
}

Posts.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		})
	),
	loadPosts: PropTypes.func.isRequired,
};


export default Posts;