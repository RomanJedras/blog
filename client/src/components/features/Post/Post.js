import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import Spinner from '../../common/Spinner/Spinner';
import PostSummary from '../PostSummary/PostSummary';


class Post extends Component {
	render () {
		return (
			<div>
				<PostSummary key={post.id} {...post} />
			</div>
		);
	}
}

Post.prototype = {
	post: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		})
	),
}


export default Post;