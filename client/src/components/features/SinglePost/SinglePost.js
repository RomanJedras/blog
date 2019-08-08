import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { FacebookProvider, Comments, ShareButton } from "react-facebook";

import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import { withRouter, Link } from 'react-router-dom';
import Button from "../../common/Button/Button";


import { BASE_URL } from "../../../config";
import '../PostSummary/PostSummary.scss';





class SinglePost extends Component {
	
	componentDidMount() {
		const { loadPost, resetRequest, match } = this.props;
		loadPost(match.params.id);
		resetRequest();
	}
	
	
	render () {
		const { singlePost, request, location } = this.props;
		
		if (request.pending === false && request.success === true) {
			
			return (
				<div>
					<article className="post-summary">
						<SmallTitle>{singlePost.title}</SmallTitle>
						<FacebookProvider appId="369668593718797">
							<ShareButton className="button button--primary" href={`${BASE_URL}${location.pathname}`}>
								Share
							</ShareButton>
						
						<HtmlBox>{singlePost.content}</HtmlBox>
						<p>Author: {singlePost.author}</p>
						<Comments href={`http://localhost:3000/${location.pathname}`} />
						</FacebookProvider>
						<Button variant="primary"><Link to={`/posts/`}>
							Posts list
						</Link></Button>
					</article>
				</div>
			)
		}
		
		if (request.pending === true || request.success === null) {
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
		
		if (request.pending === false && request.success === true && SinglePost.length === 0) {
			return (
				<div>
					<Alert variant='info' children='-- no posts --'/>
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

export default withRouter(props => <SinglePost {...props} />);
