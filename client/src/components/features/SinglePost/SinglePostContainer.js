import { connect } from 'react-redux';
import { getSinglePost, getRequest, loadOnePostRequest, resetRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => ({
	singlePost: getSinglePost(state),
	request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
	loadPost: (id) => dispatch(loadOnePostRequest(id)),
	resetRequest: () => dispatch(resetRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost));




