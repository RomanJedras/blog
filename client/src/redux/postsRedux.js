import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
export const getPostsNumber = ({ posts }) => posts.data.length;
export const getRequest = ({ posts }) => posts.request;
export const getSinglePost = ({ posts }) => posts.singlePost;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);
export const getPresentPage = ({posts}) => posts.presentPage;
/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = {
	data: [],
	amount: 0,
	singlePost: {
		id: '',
		title: '',
		content: '',
		author: ''
	},
	request: {
		pending: false,
		error: null,
		success: null,
	},
};

/* REDUCER */
/* ACTIONS */
export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const LOAD_ONEPOST = createActionName('LOAD_ONEPOST');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');
export const LOAD_RANDOM_POST = createActionName("LOAD_RANDOM_POST");
/* THUNKS */
export const loadPostsRequest = () => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			let res = await axios.get(`${API_URL}/posts`);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			dispatch(loadPosts(res.data));
			dispatch(endRequest());
		} catch(e) {
			dispatch(errorRequest(e.message));
		}
		
		return Promise.resolve()
	};
};

export const loadRandomPostRequest = () => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			let res = await axios.get(`${API_URL}post/random`);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			dispatch(loadRandomPost(res.data));
			dispatch(endRequest());
		} catch (e) {
			dispatch(errorRequest(e.message));
		}
		return Promise.resolve()
	};
};

export const loadOnePostRequest = (id) => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			let res = await axios.get(`${API_URL}/posts/${id}`);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			dispatch(loadOnePost(res.data));
			dispatch(endRequest());
		} catch(e) {
			dispatch(errorRequest(e.message))
		}
	return Promise.resolve()
	}
};

export const addPostRequest = (post) => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			await axios.post(`${API_URL}/posts`, post);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			dispatch(endRequest());
		} catch(e) {
			dispatch(errorRequest(e.message));
		}
	};
};

export const updatePostRequest = (post) => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			await axios.put(`${API_URL}posts/${post._id}`, post);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			dispatch(endRequest());
		} catch(e) {
			dispatch(errorRequest(e.message));
		}
	};
};

export const loadPostsByPageRequest = (page, postsPerPage) => {
	return async dispatch => {
		dispatch(startRequest());
		try {
			const startAt = (page - 1) * postsPerPage;
			const limit = postsPerPage;
			let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
			await new Promise((resolve, reject) => setTimeout(resolve, 2000));
			const payload = {
				posts: res.data.posts,
				amount: res.data.amount,
				postsPerPage,
				presentPage: page,
			};
			dispatch(loadPostsByPage(payload));
			dispatch(endRequest());
		} catch (err) {
			dispatch(errorRequest(err.message));
		}
	}
};

/* CREATOR ACTIONS */
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadOnePost = payload =>({payload, type: LOAD_ONEPOST });
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });
export const loadRandomPost = payload => ({ payload, type: LOAD_RANDOM_POST });
export default function reducer(statePart = initialState, action = {}) {
	
	switch (action.type) {
		case LOAD_POSTS:
			return { ...statePart, data: action.payload };
		case LOAD_ONEPOST:
			return { ...statePart, singlePost: action.payload, request: { pending: true, error: null, success: null } };
		case START_REQUEST:
			return { ...statePart, request: { pending: true, error: null, success: null } };
		case END_REQUEST:
			return { ...statePart, request: { pending: false, error: null, success: true } };
		case ERROR_REQUEST:
			return { ...statePart, request: { pending: false, error: action.error, success: false } };
		case RESET_REQUEST:
			return { ...statePart ,request: { pending: false, error: null, success: null } };
		case LOAD_POSTS_PAGE:
			return  {
				...statePart,
				postsPerPage: action.payload.postsPerPage,
				presentPage: action.payload.presentPage,
				amount: action.payload.amount,
				data: [...action.payload.posts],
			};
		case LOAD_RANDOM_POST:
			return { ...statePart, singlePost: action.payload, request: { pending: true, error: null, success: null } };
		default:
			return statePart;
	}
};