import React, { Component } from 'react'
import { Helmet } from "react-helmet"

class Post extends Component {
    render() {
        return (
            <div className="post-wrapper container column">
                <Helmet>
                    <script src="https://use.fontawesome.com/9fdf74825d.js"></script>
                </Helmet>
                <div className="post-header container column">
                    <div className="container column">
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        <span>12</span>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>

                    <h1>
                        {this.props.params}
                    </h1>
                </div>
                <div className="post-body">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        )
    }
}

export default Post