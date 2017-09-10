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
        setActivePost: (postId) => dispatch(Actions.setActivePost(postId)),
        fetchPosts: () => dispatch(Actions.fetchPosts()),
        updatePostForm: (attribute, value) => dispatch(Actions.updatePostForm({ attribute, value })),
        updatePost: (postId, body, title) => dispatch(Actions.updatePost(postId, body, title))
    }
}

class EditPostForm extends Component {

    componentDidMount() {
        this.props.fetchPosts().then(() => {
            this.props.setActivePost({ postId: this.props.match.params.id })
            this.props.updatePostForm('title', this.props.post.title)
            this.props.updatePostForm('body', this.props.post.body)
        })
    }

    handleChange(event) {
        const { id, value } = event.target
        this.props.updatePostForm(id, value)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updatePost(this.props.match.params.id, this.props.postForm.body, this.props.postForm.title)
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
                        Body:
                        <textarea
                            id="body"
                            value={postForm.body}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <input style={{ width: 100 }} type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm)