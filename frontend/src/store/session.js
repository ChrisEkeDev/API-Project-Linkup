import { csrfFetch } from "./csrf";

// TYPES

const SET_SESSION = '/linkup/session/SET_SESSION';
const REMOVE_SESSION = '/linkup/session/REMOVE_SESSION';
const GET_SESSION = '/linkup/session/GET_SESSION';

// ACTIONS

const actionSetSession = (user) => ({
    type: SET_SESSION,
    payload: user
})

const actionRemoveSession = () => ({
    type: REMOVE_SESSION
})

const actionGetSession = (user) => ({
    type: GET_SESSION,
    payload: user
})

// THUNKS

export const thunkLogIn = (user) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(actionSetSession(data.user));
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkLogOut = () => async dispatch => {
    const res = await csrfFetch('/api/session', { method: 'DELETE'});
    if (res.ok) {
        dispatch(actionRemoveSession());
        return { message: 'User logged out' }
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkRestoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetSession(data.user))
    }
}

export const thunkSignUp = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(actionSetSession(data.user))
    } else {
        const errors = await res.json();
        return errors;
    }
}


// REDUCER

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSION:
        case GET_SESSION: {
            const newState = { ...state };
            newState.user = action.payload;
            return newState
        };
        case REMOVE_SESSION: {
            const newState = { ...state };
            newState.user = null;
            return newState
        };
        default:
            return state;
    }
}

export default sessionReducer;
