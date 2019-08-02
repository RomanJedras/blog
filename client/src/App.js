import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout/MainLayout';
import Home from './components/pages/Home/HomePage';
import Posts from './components/pages/Posts/PostsPage';
import Contact from './components/pages/Contact/ContactPage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import AddPostPage from './components/pages/AddPostPage/AddPostPage';
import SinglePostPage from './components/pages/SinglePostPage/SinglePostPage';


class App extends React.Component {
    
  
  
  render() {
    return (
        <MainLayout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/posts" exact component={Posts} />
                <Route path="/posts/new" exact key='add_post' component={AddPostPage} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/posts/:id" exact component={SinglePostPage} />
                <Route path="/posts/new/:id" exact key='edit_post' component={AddPostPage} />
                <Route component={NotFound} />
            </Switch>
        </MainLayout>
    );
  }
  
};

export default App;


