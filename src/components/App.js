import React, { Component } from 'react'
import './App.css'
import Post from './Post'
import { Route } from 'react-router-dom'
import Home from './Home'

class App extends Component {
    render() {
        return (
            <div className="app">
                <Route exact path='/' component={Home} />
                <Route path='/post/:id' component={Post} />
            </div>
        )
    }
}

export default App