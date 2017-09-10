import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const mapStateToProps = function (state) {

    return {
        commentForm: state.comments.commentForm,
        comment: state.comments.byId[state.comments.active],
        comments: state.comments.byId
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
        const { postId, commentId } = this.props.match.params
        console.log(this.props.match)
        const { setActiveComment, match, updateCommentForm, comments } = this.props
        this.props.fetchComments(postId).then(() => {
            setActiveComment({ commentId })
            updateCommentForm('body', comments[commentId].body)
        })
    }

    handleChange(event) {
        const { id, value } = event.target
        this.props.updateCommentForm(id, value)
    }

    handleSubmit(event) {
        event.preventDefault();
        const { updateComment, match, commentForm, history } = this.props
        updateComment(match.params.commentId, commentForm.body, commentForm.author)
        history.goBack()
    }

    render() {
        const { commentForm } = this.props
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className="post-wrapper container column">
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