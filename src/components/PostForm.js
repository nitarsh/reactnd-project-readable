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
        updatePostForm: (attribute, value) => dispatch(Actions.updatePostForm({ attribute, value }))
    }
}

class PostForm extends Component {

    componentDidMount() {
        if (this.props.match.params.mode === 'edit' && this.props.post) {
            this.props.fetchPosts().then(() => {
                this.props.updatePostForm('title', this.props.post.title)
                this.props.updatePostForm('voteScore', this.props.post.voteScore)
                this.props.updatePostForm('body', this.props.post.body)
            })
        }
    }

    handleChange(event) {
        const { id, value } = event.target
        this.props.updatePostForm(id, value)
    }

    render() {
        const { postForm } = this.props
        return (
            <form action="">
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
                    <label>
                        Score:
                        <input
                            id="voteScore"
                            type="number"
                            value={postForm.voteScore}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <input style={{ width: 100 }} type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)