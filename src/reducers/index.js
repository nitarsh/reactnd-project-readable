
import { combineReducers } from 'redux'
import {
    SET_POSTS,
    SET_ACTIVE_POST,
    SET_CATEGORIES,
    SET_COMMENTS
} from '../actions'

const initialPostState = {
    byId: {},
    allIds: [],
    byCategory: {},
    active: { voteScore: 0, title: '', body: '' }
}

function posts(state = initialPostState, action) {
    switch (action.type) {
        case SET_POSTS:
            let allPostIds = []
            let categories = [...new Set(action.posts.map(p => p.category))]
            let postIdsByCategory = categories.reduce((s, c) => { s[c] = []; return s }, {})
            let byId = {}
            for (let post of action.posts) {
                allPostIds.push(post.id)
                postIdsByCategory[post.category].push(post.id)
                byId[post.id] = post
            }
            return {
                ...state,
                byId: byId,
                allIds: allPostIds,
                byCategory: postIdsByCategory
            }
        case SET_ACTIVE_POST:
            return {
                ...state,
                active: state.byId[action.postId]
            }
        default:
            return state
    }
}



function categories(state = [], action) {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case SET_CATEGORIES:
            console.log(action.categories)
            return state.concat(action.categories)
        default:
            return state
    }
}

const initialCommentsState = {
    byId: {},
    byPost: {}
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                byPost: {
                    ...state.byPost,
                    [action.postId]: action.comments
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    comments,
})