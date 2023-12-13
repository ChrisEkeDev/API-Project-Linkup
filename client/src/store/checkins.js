import { csrfFetch } from './csrf';

// TYPES
// const GET_SESSION_ATTENDEES = '/linkup/checkIns/GET_SESSION_ATTENDEES';
const GET_CHECKINS = '/linkup/checkIns/GET_CHECKINS';
// const GET_MY_CHECKINS = '/linkup/checkIns/GET_MY_CHECKINS';
const ADD_CHECKIN = '/linkup/checkIns/ADD_CHECKIN';
// const UPDATE_CHECKIN = '/linkup/checkIns/UPDATE_CHECKIN';
const DELETE_CHECKIN = '/linkup/checkIns/DELETE_CHECKIN';

// // ACTIONS
// const actionGetSessionAttendees = (attendees) => ({
//     type: GET_SESSION_ATTENDEES,
//     payload: attendees
// })

const actionGetCheckIns = (checkIns) => ({
    type: GET_CHECKINS,
    payload: checkIns
})

// const actionGetMyCheckIns = (checkIns) => ({
//     type: GET_MY_CHECKINS,
//     payload: checkIns
// })

const actionAddCheckIn = (checkIns) => ({
    type: ADD_CHECKIN,
    payload: checkIns
})

const actionDeleteCheckIn = (checkIns) => ({
    type: DELETE_CHECKIN,
    payload: checkIns
})


// THUNKS
// export const thunkGetSessionAttendees = (sessionId) => async dispatch => {
//     const res = await csrfFetch(`/api/sessions/${sessionId}/attendees`);
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(actionGetSessionAttendees(data.Attendees))
//     } else {
//         const errors = await res.json();
//         return errors
//     }
// }

export const thunkGetCheckIns = (sessionId) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`)
    try {
        const jsonResponse = await res.json();
        dispatch(actionGetCheckIns(jsonResponse.data))
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

// export const thunkGetMyCheckIns = () => async dispatch => {
//     const res = await csrfFetch('/api/checkIns');
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(actionGetMyCheckIns(data.CheckIns))
//     } else {
//         const errors = await res.json();
//         return errors
//     }
// }

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

export const thunkDeleteCheckIn = (checkIn) => async dispatch => {
    const res = await csrfFetch(`/api/sessions/${checkIn.sessionId}/checkIn`, {
        method: 'DELETE',
        body: JSON.stringify(checkIn)
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

const initialState = { sessionCheckIns: {} }
const checkInsReducer = (state = initialState, action) => {
    switch(action.type) {
        // case GET_SESSION_ATTENDEES: {
        //     const newState = { myCheckIns: {...state.myCheckIns}, sessionCheckIns: {...state.sessionCheckIns}, sessionAttendees: {} };
        //     action.payload.forEach(attendee => newState.sessionAttendees[attendee.id] = attendee)
        //     return newState;
        // }
        case GET_CHECKINS: {
            const newState = { ...state, sessionCheckIns: {} };
            action.payload.forEach(checkIn => newState.sessionCheckIns[checkIn.id] = checkIn)
            return newState;
        }
        // case GET_MY_CHECKINS: {
        //     const newState = { myCheckIns: {}, sessionCheckIns: {...state.sessionCheckIns}, sessionAttendees:{...state.sessionAttendees}};
        //     action.payload.forEach(checkIn => newState.myCheckIns[checkIn.id] = checkIn)
        //     return newState;
        // }
        case ADD_CHECKIN: {
            const newState = { ...state };
            newState.sessionCheckIns = {...newState.sessionCheckIns, [action.payload.id]: action.payload }
            return newState;
        }
        case DELETE_CHECKIN: {
            const newState = { ...state };
            delete newState.sessionCheckIns[action.payload.id]
            return newState;
        }
        default:
            return state;
    }
}

export default checkInsReducer;
