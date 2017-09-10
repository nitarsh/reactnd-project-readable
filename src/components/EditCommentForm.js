import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const mapStateToProps = function (state) {

    return {
        commentForm: state.posts.commentForm,
        comment: state.comments.byId[state.comment.active]
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setActiveComment:
        (commentId) => dispatch(Actions.setActiveComment(commentId)),
        fetchComments:
        (postId) => dispatch(Actions.fetchCommentsForPost({ postId })),
        updateCommentForm:
        (attribute, value) => dispatch(Actions.updateCommentForm({ attribute, value })),
        updateComment:
        (postId, body, author) => dispatch(Actions.updateComment(postId, body, author))
    }
}

class EditCommentForm extends Component {

    componentDidMount() {
        this.props.fetchComments().then(() => {
            const { setActiveComment, match, updateCommentForm, comment } = this.props
            setActiveComment({ commentId: match.params.id })
            console.log(comment)
            console.log(match.params.id)
            updateCommentForm('author', comment.title)
            updateCommentForm('body', comment.body)
        })
    }

    handleChange(event) {
        const { id, value } = event.target
        this.props.updateCommentForm(id, value)
    }

    handleSubmit(event) {
        event.preventDefault();
        const { updateComment, match, commentForm, history } = this.props
        updateComment(match.params.id, commentForm.body, commentForm.author)
        history.goBack()
    }

    render() {
        const { commentForm } = this.props
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className="post-wrapper container column">
                    <label>
                        Author:
                        <input
                            id="title"
                            type="text"
                            value={commentForm.author}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <label>
                        Body:
                        <textarea
                            id="body"
                            value={commentForm.body}
                            onChange={(event) => this.handleChange(event)}
                        />
                    </label>
                    <input style={{ width: 100 }} type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentForm)