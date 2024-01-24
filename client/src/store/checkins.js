import { csrfFetch } from './csrf';

// TYPES
const GET_MY_CHECKINS = '/backcourts/checkIns/GET_MY_CHECKINS'
const GET_SESSION_CHECKINS = '/backcourts/checkIns/GET_SESSION_CHECKINS';
const ADD_TO_SESSION = '/backcourts/checkIns/ADD_TO_SESSION'
const REMOVE_FROM_SESSION = '/backcourts/checkIns/REMOVE_FROM_SESSION'
const CHECK_IN = '/backcourts/checkIns/CHECK_IN';
const CHECK_OUT = '/backcourts/checkIns/CHECK_OUT';

const actionGetMyCheckIns = (checkIns) => ({
    type: GET_MY_CHECKINS,
    payload: checkIns
})

const actionGetSessionCheckIns = (checkIns) => ({
    type: GET_SESSION_CHECKINS,
    payload: checkIns
})

const actionAddToSession = (checkIn) => ({
    type: ADD_TO_SESSION,
    payload: checkIn
})

const actionRemoveFromSession = (checkIn) => ({
    type: REMOVE_FROM_SESSION,
    payload: checkIn
})

const actionCheckIn = (checkIn) => ({
    type: CHECK_IN,
    payload: checkIn
})

const actionCheckOut = (checkIn) => ({
    type: CHECK_OUT,
    payload: checkIn
})

export const thunkGetMyCheckIns = () => async dispatch => {
    const res = await csrfFetch('/api/check-ins/current');
    try {
        const jsonResponse = await res.json();
        dispatch(actionGetMyCheckIns(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }

}
export const thunkGetSessionCheckIns = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`)
    try {
        const jsonResponse = await res.json();
        dispatch(actionGetSessionCheckIns(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkAddToSession = (sessionId, playerId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/add-to-session`, {
        method: 'PUT',
        body: JSON.stringify({playerId})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionAddToSession(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkRemoveFromSession = (sessionId, playerId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/remove-from-session`, {
        method: 'DELETE',
        body: JSON.stringify({playerId})
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionRemoveFromSession(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkCheckIn = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-in`, {
        method: 'POST'
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionCheckIn(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkCheckOut = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-out`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionCheckOut(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

// REDUCER

const initialState = { sessionCheckIns: {}, myCheckIns: {} }
const checkInsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SESSION_CHECKINS: {
            const newState = { ...state, sessionCheckIns: {} };
            action.payload.forEach(checkIn => newState.sessionCheckIns[checkIn.id] = checkIn)
            return newState;
        }
        case GET_MY_CHECKINS: {
            const newState = { ...state, myCheckIns: {} };
            action.payload.forEach(checkIn => newState.myCheckIns[checkIn.id] = checkIn)
            return newState;
        }
        case CHECK_IN: {
            const newState = { ...state, myCheckIns: { ...state.myCheckIns } };
            newState.myCheckIns = {...newState.myCheckIns, [action.payload.id]: action.payload }
            return newState;
        }
        case ADD_TO_SESSION: {
            const newState = { ...state, sessionCheckIns: {...state.sessionCheckIns } };
            newState.sessionCheckIns = {...newState.sessionCheckIns, [action.payload.id]: action.payload }
            return newState;
        }
        case REMOVE_FROM_SESSION: {
            const newState = { ...state, sessionCheckIns: {...state.sessionCheckIns } };
            delete newState.sessionCheckIns[action.payload.id]
            return newState;
        }
        case CHECK_OUT: {
            const newState = { ...state, myCheckIns: {...state.myCheckIns } };
            delete newState.myCheckIns[action.payload.id]
            return newState;
        }
        default:
            return state;
    }
}

export default checkInsReducer;
