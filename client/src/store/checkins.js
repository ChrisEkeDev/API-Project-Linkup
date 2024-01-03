import { csrfFetch } from './csrf';

// TYPES
const GET_SESSION_CHECKINS = '/linkup/checkIns/GET_SESSION_CHECKINS';
const GET_PLAYER_CHECKINS = '/linkup/checkIns/GET_PLAYER_CHECKINS';
const ADD_CHECKIN = '/linkup/checkIns/ADD_CHECKIN';
const DELETE_CHECKIN = '/linkup/checkIns/DELETE_CHECKIN';

const actionGetSessionCheckIns = (checkIns) => ({
    type: GET_SESSION_CHECKINS,
    payload: checkIns
})

const actionGetPlayerCheckIns = (checkIns) => ({
    type: GET_PLAYER_CHECKINS,
    payload: checkIns
})

const actionAddCheckIn = (checkIn) => ({
    type: ADD_CHECKIN,
    payload: checkIn
})

const actionDeleteCheckIn = (checkIn) => ({
    type: DELETE_CHECKIN,
    payload: checkIn
})

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

export const thunkGetPlayerCheckIns = () => async dispatch => {
    const res = await csrfFetch('/api/check-ins');
    try {
        const jsonResponse = await res.json();
        dispatch(actionGetPlayerCheckIns(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }

}

export const thunkAddCheckIn = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`, {
        method: 'POST'
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionAddCheckIn(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteCheckIn = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        dispatch(actionDeleteCheckIn(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

// REDUCER

const initialState = { sessionCheckIns: {}, playerCheckIns: {} }
const checkInsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SESSION_CHECKINS: {
            const newState = { ...state, sessionCheckIns: {} };
            action.payload.forEach(checkIn => newState.sessionCheckIns[checkIn.id] = checkIn)
            return newState;
        }
        case GET_PLAYER_CHECKINS: {
            const newState = { ...state, playerCheckIns: {} };
            action.payload.forEach(checkIn => newState.playerCheckIns[checkIn.id] = checkIn)
            return newState;
        }
        case ADD_CHECKIN: {
            const newState = { ...state, sessionCheckIns: {...state.sessionCheckIns } };
            newState.sessionCheckIns = {...newState.sessionCheckIns, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_CHECKIN: {
            const newState = { ...state, sessionCheckIns: {...state.sessionCheckIns } };
            delete newState.sessionCheckIns[action.payload.id]
            return newState;
        }
        default:
            return state;
    }
}

export default checkInsReducer;
