import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const mapStateToProps = function (state) {

    return {
        postForm: state.posts.postForm,
        post: state.posts.byId[state.posts.active]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        updatePostForm: (attribute, value) => dispatch(Actions.updatePostForm({ attribute, value })),
        createPost: (post) => dispatch(Actions.createPost(post))
    }
}

class NewPostForm extends Component {

    componentDidMount() {
    }

    handleChange(event) {
        const { id, value } = event.target
        this.props.updatePostForm(id, value)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createPost(this.props.postForm)
        this.props.history.goBack()
    }

    render() {
        const { postForm } = this.props
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className="post-wrapper container column">
                    <label>
                        Title:
                        <input
                            id="title"
                            type="text"
                            value={postForm.title}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <label>
                        Author:
                    <input
                            id="author"
                            type="text"
                            value={postForm.author}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <label>
                        Body:
                        <textarea
                            id="body"
                            value={postForm.body}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            id="category"
                            value={postForm.voteScore}
                            onChange={(event) => this.handleChange(event)}
                        >
                            <option value="react">React</option>
                            <option value="redux">Redux</option>
                            <option value="udacity">Udacity</option>
                        </select>
                    </label>
                    <input style={{ width: 100 }} type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm)