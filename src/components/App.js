import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from "react-helmet"
import './App.css'
import Post from './Post'
import PostForm from './PostForm'
import Home from './Home'
import Category from './Category'

class App extends Component {
    render() {
        return (
            <div className="app">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <Route exact path='/' component={Home} />
                <Route exact path='/post/:id' component={Post} />
                <Route exact path='/form/post/:mode' component={PostForm} />
                <Route exact path='/category/:id' component={Category} />
            </div>
        )
    }
}

export default App