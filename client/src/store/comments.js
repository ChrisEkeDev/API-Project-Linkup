import { csrfFetch } from './csrf';

//TYPES
const GET_COMMENTS_BY_SESSION = '/linkup/comments/GET_COMMENTS_BY_SESSION'
const CREATE_COMMENT = '/linkup/comments/CREATE_COMMENT'
const DELETE_COMMENT = '/linkup/comments/DELETE_COMMENT'
const UPDATE_COMMENT = '/linkup/comments/UPDATE_COMMENT'

// ACTIONS
const actionGetCommentsBySession = (comments) => ({
    type: GET_COMMENTS_BY_SESSION,
    payload: comments
})

const actionCreateComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})

const actionUpdateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

const actionDeleteComment = (comment) => ({
    type: DELETE_COMMENT,
    payload: comment
})


// THUNKS
export const thunkGetCommentsBySession = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/sessions/${sessionId}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetCommentsBySession(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkCreateComment = (commentData) => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData)
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateComment(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteComment(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkUpdateComment = (commentData, id) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(commentData)
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateComment(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}


// REDUCER

const initialState = { comments:{} }
const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COMMENTS_BY_SESSION: {
            const newState = { comments: {} };
            action.payload.forEach(comment => newState.comments[comment.id] = comment );
            return newState
        };
        case CREATE_COMMENT: {
            const newState = { ...state };
            newState.comments = {...newState.comments, [action.payload.id]: action.payload }
            return newState
        }
        case UPDATE_COMMENT: {
            const newState = { comments: { ...state.comments } };
            newState.comments[action.payload.id] = action.payload;
            return newState;

        }
        case DELETE_COMMENT: {
            const newState = { comments: { ...state.comments } };
            delete newState.comments[action.payload.id]
            return newState
        }
        default:
            return state;
    }
}

export default commentsReducer;
