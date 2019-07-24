import React from 'react';
import { PropTypes } from 'prop-types';

import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import cutText from './PostSummaryContainer'
import './PostSummary.scss';


const handleChange = (id) => {
	console.log(id);
}



const PostSummary = ({ _id, title, content }) => (
	<article className="post-summary">
		<SmallTitle>{title}</SmallTitle>
		<HtmlBox>{cutText(content, 250)}</HtmlBox>
		<Button variant="primary" onClick={() =>{
			handleChange(_id)
		}}>
			Read more
		</Button>
	</article>
);

PostSummary.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	content: PropTypes.string,
};

export default PostSummary;