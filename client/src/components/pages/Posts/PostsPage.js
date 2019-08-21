import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import PostsCounter from '../../features/PostsCounter/PostsCounterContainer';
import Posts from '../../features/Posts/PostsContainer';

const PostsPage = () => (
	<div>
		<PageTitle>Posts list</PageTitle>
		<PostsCounter />
		<Posts pagination={true} postsPerPage={10} initialPage={1}/>
	</div>
);

export default PostsPage;