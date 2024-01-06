import { csrfFetch } from "./csrf";

// TYPES

const SET_AUTH = '/linkup/auth/SET_AUTH';
const REMOVE_AUTH = '/linkup/auth/REMOVE_AUTH';
const GET_AUTH = '/linkup/auth/GET_AUTH';

// ACTIONS

const actionSetAuthPlayer = (player) => ({
    type: SET_AUTH,
    payload: player
})

const actionRemoveAuthPlayer = () => ({
    type: REMOVE_AUTH
})

const actionGetAuthPlayer = (player) => ({
    type: GET_AUTH,
    payload: player
})

// THUNKS

export const thunkSignInPlayer = (playerData) => async dispatch => {
    const res = await csrfFetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(playerData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionSetAuthPlayer(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkSignOutPlayer = () => async dispatch => {
    const res = await csrfFetch('/api/auth', { method: 'DELETE'});

    try {
        const jsonResponse = await res.json();
        dispatch(actionRemoveAuthPlayer());
        return jsonResponse;
    } catch (error) {
        console.error(error);
    }
}

export const thunkRestorePlayerSession = () => async dispatch => {
    const res = await csrfFetch('/api/auth');
    try {
        const jsonResponse = await res.json();
        dispatch(actionGetAuthPlayer(jsonResponse.data))
        return jsonResponse;
    } catch (error) {
        console.error(error);
    }
}

export const thunkSignUpPlayer = (playerData) => async dispatch => {
    const res = await csrfFetch('/api/players', {
        method: 'POST',
        body: JSON.stringify(playerData)
    })

    try {
        const jsonResponse = await res.json();
        dispatch(actionSetAuthPlayer(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error);
    }
}


// REDUCER

const initialState = { player: null };

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH:
        case GET_AUTH: {
            const newState = { ...state };
            newState.player = action.payload;
            return newState
        };
        case REMOVE_AUTH: {
            const newState = { ...state };
            newState.player = null;
            return newState
        };
        default:
            return state;
    }
}

export default authReducer;
