import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import cutText from './PostSummaryContainer'
import './PostSummary.scss';





const PostSummary = ({ _id, title, content, author }) => (
	<article className="post-summary">
		<SmallTitle>{title}</SmallTitle>
		<HtmlBox>{cutText(content, 250)}</HtmlBox>
		<p>Author: {author}</p>
		<Button variant="primary"><Link to={`/posts/${_id}`}>
			Read more
		</Link></Button>
	</article>
);

PostSummary.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	content: PropTypes.string,
	author: PropTypes.string
};

export default PostSummary;