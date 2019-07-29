import { connect } from 'react-redux';
import { getRequest, addPostRequest } from '../../../redux/postsRedux';
import PostForm from './PostForm';


const mapStateToProps = state => ({
	request: getRequest(state),
});


const mapDispatchToProps = dispatch => ({
	addPost: (post) => dispatch(addPostRequest(post)),
	resetRequest: () => dispatch({ type: 'RESET_REQUEST' })
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);