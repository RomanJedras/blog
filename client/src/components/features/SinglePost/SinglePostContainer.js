import { connect } from 'react-redux';
import { getSinglePost, getRequest, loadOnePostRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';
import { withRouter } from "react-router-dom";


const mapStateToProps = (state) => ({
	singlePost: getSinglePost(state),
	request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
	
	loadPost: (id) => dispatch(loadOnePostRequest(id)),
	resetRequest: () => dispatch({ type: 'RESET_REQUEST' })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost));




