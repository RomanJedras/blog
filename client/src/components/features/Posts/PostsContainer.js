import { connect } from 'react-redux';
import { getPosts, getRequest, loadPostsRequest, loadOnePostRequest } from '../../../redux/postsRedux';
import Posts from './Posts';

const mapStateToProps = state => ({
	posts: getPosts(state),
	request: getRequest(state),
})

const mapDispatchToProps = dispatch => ({
	loadPosts: () => dispatch(loadPostsRequest()),
	loadOnePost: (id) => dispatch(loadOnePostRequest(id))
});




export default connect(mapStateToProps, mapDispatchToProps)(Posts);