import React, { Component } from 'react'
import './App.css'
import { Helmet } from "react-helmet"
import * as API from '../utils/api'
import Post from './Post'
import { Link, Route } from 'react-router-dom'

class App extends Component {
    state = {
        posts: [],
        categories: []
    }

    componentDidMount() {
        API.posts().then((posts) => (this.setState({ posts })))
        API.categories().then((categories) => (this.setState({ categories })))
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <Home posts={this.state.posts} categories={this.state.categories} />
                )}
                />
                <Route path='/post/:id' component={Post} />
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <section className="sidebar"><CategoryList categories={this.props.categories} /></section>
                <section className="main"><PostOutlineList posts={this.props.posts} /></section>
            </div>
        )
    }
}

class CategoryList extends Component {
    render() {
        const { categories } = this.props
        return (
            <div className="category-list-wrapper">
                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category.name}>{category.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

class PostOutlineList extends Component {
    render() {
        const { posts } = this.props
        return (
            <div className="post-list-wrapper">
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.id}><PostOutline post={post} /></li>
                    ))}
                </ul>
            </div>
        )
    }
}


class PostOutline extends Component {
    render() {
        return (
            <div className="post-outline-wrapper container v-center compressed">
                <div className="container column">
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    <span>{this.props.post.voteScore}</span>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>
                <Link to={"/post/" + this.props.post.id} className="post-link">
                    <h2>{this.props.post.title}</h2>
                </Link>
            </div>
        )
    }
}

export default App