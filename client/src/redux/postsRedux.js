
/* SELECTORS */
export const getPosts = ({ posts }) => posts.data;
/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* INITIAL STATE */

const initialState = [

];

/* REDUCER */

export const LOAD_POSTS = createActionName('LOAD_POSTS');

/* THUNKS */
export const loadPostsRequest = () => {
	return dispatch => {
		
		console.log('Request started...');
		setTimeout(() => {
			const arr = [{ id: 'a3fssdc1', title: 'Test', content: 'Lorem Ipsum' }];
			dispatch(loadPosts(arr));
			console.log('Request finished after 2sec!');
		}, 2000);
		
	};
};

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });

export default function reducer(statePart = initialState, action = {}) {
	
	console.log(action);
	
	switch (action.type) {
		case LOAD_POSTS:
			return [ ...action.payload ];
		default:
			return statePart;
	}
};