/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-17.
 */
import {combineReducers} from "redux";
import * as DO from "./actions";

const selectedSubreddit = (state = 'reactjs', action) => {
    switch (action.type) {
        case DO.SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

const posts = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case DO.INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case DO.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case DO.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

const postsBySubreddit = (state = {}, action) => {
    switch (action.type) {
        case DO.INVALIDATE_SUBREDDIT:
        case DO.RECEIVE_POSTS:
        case DO.REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
})

export default rootReducer
