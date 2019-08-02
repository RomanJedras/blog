import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from "react-router-dom";


import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import './PostForm.scss';


class PostForm extends Component {
	state = {
		post: {
			title: '',
			author: '',
			content: ''
		}
	}
	
    componentDidMount () {
	   const { resetRequest, loadPost } = this.props;
	   
	   if (this.props.match.params.id) {
	   	loadPost(this.props.match.params.id).then(
		    () => {
			    resetRequest();
			    this.setState({
				  post:  this.props.singlePost
			    }
			 )
		   }
	    )
	   }
	   resetRequest();
    }
	
	editPost = (e) => {
		const {updatePost} = this.props;
		const { post } = this.state;
		
		e.preventDefault();
		updatePost(post);
	};
    
    handleChange = (e) => {
		const { post } = this.state;
		this.setState({ post: { ...post, [e.target.name]: e.target.value }});
	};
	
	handleEditor = (text) => {
		const { post } = this.state;
		this.setState({ post: { ...post, content: text }});
	};
	
	addPost = (e) => {
		const { addPost } = this.props;
		const { post } = this.state;
		
		e.preventDefault();
		addPost(post);
	};
	
	render () {
		
		const { post } = this.state;
		const { handleChange, handleEditor, addPost, editPost } = this;
		const { request } = this.props;
		if(request.error) return <Alert variant="error">{request.error}</Alert>
		else if(request.success) return <Alert variant="success">{ (this.props.match.params.id) ? 'Post was updated' : 'Post has been added!'}</Alert>
		else if(request.pending) return <Spinner />
		else return (
				<div>
					<h1>{(this.props.match.params.id) ? 'Update post' :'Add new Post'}</h1>
				
					<form onSubmit= {(this.props.match.params.id) ? editPost : addPost }>
				
					<TextField
						label="Title"
						value={post.title}
						onChange={handleChange}
						name="title"
					/>
					
					<TextField
						label="Author"
						value={post.author}
						onChange={handleChange}
						name="author"
					/>
					
					<SectionTitle>Edit post content</SectionTitle>
					
					<Editor
						className="content-editor"
						text={post.content}
						onChange={handleEditor}
						options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
					/>
					 <Button variant="primary">{ (this.props.match.params.id) ? 'Edit post' : 'Add post' }</Button>
				
			</form></div>
			);
	}
}

PostForm.propTypes = {
	request: PropTypes.object.isRequired,
	addPost: PropTypes.func.isRequired,
	updatePost: PropTypes.func.isRequired
};

export default withRouter(PostForm);
