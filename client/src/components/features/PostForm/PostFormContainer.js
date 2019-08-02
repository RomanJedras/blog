import { connect } from 'react-redux';
import {getRequest, addPostRequest, resetRequest, loadOnePostRequest, getSinglePost, updatePostRequest} from '../../../redux/postsRedux';
import PostForm from './PostForm';


const mapStateToProps = state => ({
	request: getRequest(state),
	singlePost: getSinglePost(state)
});


const mapDispatchToProps = dispatch => ({
	addPost: (post) => dispatch(addPostRequest(post)),
	updatePost: (post) => dispatch(updatePostRequest(post)),
	loadPost: (id) => dispatch(loadOnePostRequest(id)),
	resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);