import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';


import '../PostSummary/PostSummary.scss';




class SinglePost extends Component {
	
	componentDidMount() {
		const { loadSinglePost, resetRequest } = this.props;
		loadSinglePost();
		resetRequest();
	}
	
	
	render () {
		const { singlePost, request } = this.props;
		if (!request.pending && !!request.success && singlePost) {
			return (
				<div>
					<article className="post-summary">
						<SmallTitle>{singlePost.title}</SmallTitle>
						<HtmlBox>{singlePost.content}</HtmlBox>
					</article>
				</div>
			)
		}
		if (request.pending || !!request.success ) {
			return (
				<div>
					<Spinner />
				</div>
			)
		};
		if (!request.pending && request.error !== null) {
			return (
				<div>
					<Alert variant='error' children={request.error}/>
				</div>
			)
		}
		if (!request.pending && request.success && !singlePost) {
			return (
				<div>
					<Alert variant='info' children='-- no post --'/>
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
		}),
	loadPosts: PropTypes.func.isRequired,
	resetRequest: PropTypes.func.isRequired,
};

export default SinglePost;