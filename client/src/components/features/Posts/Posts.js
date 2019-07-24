import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import Spinner from '../../common/Spinner/Spinner';
import PostsList from '../PostsList/PostsList';
import Alert from '../../common/Alert/Alert'


class Posts extends Component {
	
	componentDidMount() {
		const { loadPosts } = this.props;
		loadPosts();
	}
	
	
	
	render () {
		const { posts, request } = this.props;
		console.log(request.pending);
		
		if (request.pending === false && request.success === true && posts.length) {
			return (
				<div>
					<PostsList posts={posts}/>
				</div>
			);
		}
		
		if (request.pending === true || request.success === null) {
			return (
				<div>
					<Spinner />
				</div>
			)
		};
		
		if (request.pending === false && request.success === true && posts.length === 0) {
			return (
				<div>
					<Alert variant='info' children='-- no posts --'/>
				</div>
			)
		}
	
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