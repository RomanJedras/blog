import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from "react-router-dom";

import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";
import SmallTitle from "../../common/SmallTitle/SmallTitle";
import HtmlBox from "../../common/HtmlBox/HtmlBox";
import Button from '../../common/Button/Button';
import "../PostSummary/PostSummary.scss";

class RandomPost extends Component {
	componentDidMount() {
		const { loadRandomPost, resetRequestStatus } = this.props;
		loadRandomPost();
		resetRequestStatus();
	}
	
	render() {
		const { singlePost, request } = this.props;
		if (request.pending === false && request.success === true && singlePost) {
			return (
				<div>
					<article className="post-summary">
						<SmallTitle>{singlePost.title}</SmallTitle>
						<HtmlBox>{singlePost.content}</HtmlBox>
						<p>author: {singlePost.author}</p>
						<Button variant="primary"><Link to={`/posts/`}>
							Post list
						</Link></Button>
					</article>
				</div>
			);
		}
		
		if (request.pending === true || request.success === null) {
			return (
				<div>
					<Spinner />
				</div>
			)
		}
		
		if (request.pending === false && request.error !== null) {
			return (
				<div>
					<Alert variant="error">{request.error}</Alert>
				</div>
			);
		}
		
		if (request.pending === false &&  request.success === true &&  singlePost.length === null) {
			return (
				<div>
					<Alert variant="info">No post</Alert>
				</div>
			);
		} else {
			return <div />;
		}
	}
}

RandomPost.propTypes = {
	singlePost: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired
	}),
	loadRandomPost: PropTypes.func.isRequired,
	resetRequestStatus:  PropTypes.func.isRequired
};

export default withRouter(props => <RandomPost {...props} />);

