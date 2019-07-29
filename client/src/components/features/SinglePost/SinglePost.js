import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';


import '../PostSummary/PostSummary.scss';




class SinglePost extends Component {
	
	componentDidMount() {
		const { loadPost, resetRequest, match } = this.props;
		loadPost(match.params.id);
		resetRequest();
	}
	
	
	render () {
		const { singlePost, request } = this.props;
		
		if (request.pending || !!request.success && !singlePost ) {
			return (
				<div>
					<Spinner />
				</div>
			)
		} else if (!request.pending && request.error !== null) {
			return (
				<div>
					<Alert variant='error' children={request.error}/>
				</div>
			)
		} else if (!request.pending && request.success && !singlePost) {
			
			return (
				<div>
					<Alert variant='info' children='-- no post --'/>
				</div>
			)
		
		} else {
			
			return (
				<div>
					<article className="post-summary">
						<SmallTitle>{singlePost.title}</SmallTitle>
						<HtmlBox>{singlePost.content}</HtmlBox>
						<p>Author: {singlePost.author}</p>
					</article>
				</div>
			)
		}
	}
	
}


SinglePost.propTypes = {
	singlePost: PropTypes.shape(
		{ id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired
		}),
	loadPost: PropTypes.func.isRequired,
	resetRequest: PropTypes.func.isRequired,
};

export default SinglePost;