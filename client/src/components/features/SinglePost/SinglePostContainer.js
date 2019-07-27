import { connect } from 'react-redux';
import { getSinglePost, getRequest, loadOnePostRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';


const mapStateToProps = state => ({
	singlePost: getSinglePost(state),
	request: getRequest(state),
});

const mapDispatchToProps = (dispatch, {id}) => ({
	
	loadSinglePost: () => dispatch(loadOnePostRequest(id)),
	resetRequest: () => dispatch({ type: 'RESET_REQUEST' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);




