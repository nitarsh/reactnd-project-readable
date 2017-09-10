import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from "react-helmet"
import './App.css'
import Post from './Post'
import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import EditCommentForm from './EditCommentForm'
import Category from './Category'

class App extends Component {
    render() {
        return (
            <div className="app">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <Route exact path='/' component={Category} />
                <Switch>
                    <Route exact path='/:category' component={Category} />
                    <Route exact path='/:category/:id' component={Post} />
                </Switch>
                <Route exact path='/form/post/new' component={NewPostForm} />
                <Route exact path='/form/post/edit/:id' component={EditPostForm} />
                <Route exact path='/form/comment/edit/:postId/:commentId' component={EditCommentForm} />
            </div>
        )
    }
}

export default App