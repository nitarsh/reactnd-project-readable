import React, { Component } from 'react'
import './App.css';
import { Helmet } from "react-helmet";

class App extends Component {
    render() {
        return (
            <div className="app container">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <section className="sidebar"><CategoryList /></section>
                <section className="main"><PostOutlineList /></section>
            </div>
        )
    }
}

class CategoryList extends Component {
    render() {
        return (
            <div className="category-list-wrapper">
                <ul className="category-list">
                    <li>Cat1</li>
                    <li>Cat2</li>
                    <li>Cat3</li>
                </ul>
            </div>
        )
    }
}

class PostOutlineList extends Component {
    render() {
        return (
            <div className="post-list-wrapper">
                <ul className="post-list">
                    <li><PostOutline /></li>
                    <li><PostOutline /></li>
                    <li><PostOutline /></li>
                    <li><PostOutline /></li>
                    <li><PostOutline /></li>
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
                    <span>12</span>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>

                <h2>This is an example post title</h2>
            </div>
        )
    }
}

export default App