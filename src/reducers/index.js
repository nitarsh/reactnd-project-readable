import { combineReducers } from 'redux'

function posts(state = {}, action) {
    return state
}

function comments(state = {}, action) {
    return state
}

export default combineReducers({
    posts,
    comments,
})