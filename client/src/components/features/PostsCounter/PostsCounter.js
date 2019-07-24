import React, {Component} from 'react';
import { PropTypes } from 'prop-types';


class PostsCounter extends Component {
	
	render () {
		const { posts } = this.props;
		
		if (posts) {
			return (
				<div>
					Posts amount: { posts }
				</div>
			)
		}
		return (
			<div>
				- no posts -
			</div>)
	}
	
}


PostsCounter.propTypes = {
	posts: PropTypes.number,
};

export default PostsCounter;