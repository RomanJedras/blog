import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getPosts = ({ posts }) => posts;
/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = [

];

/* REDUCER */
/* ACTIONS */
export const LOAD_POSTS = createActionName('LOAD_POSTS');

/* THUNKS */
export const loadPostsRequest = () => {
	return dispatch => {
		
		axios.get(`${API_URL}/posts`).then(res => {
			dispatch(loadPosts(res.data));
		})
		.catch(err => {
			console.log(err.message);
		});
		
	};
};
/* CREATOR ACTIONS */
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });

export default function reducer(statePart = initialState, action = {}) {
	
	switch (action.type) {
		case LOAD_POSTS:
			return [ ...action.payload ];
		default:
			return statePart;
	}
};