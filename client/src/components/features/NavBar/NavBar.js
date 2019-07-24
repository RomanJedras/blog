import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
	
	render() {
		return (
			<div>
				<Link to='/'>Home</Link>
				<Link to='/posts'>Posts</Link>
				<Link to='/posts/new'>New post</Link>
				<Link to='/contact'>Contact</Link>
				<Link to='/posts/:id'>Single Post </Link>
			</div>
		);
	}
	
}

export default NavBar;