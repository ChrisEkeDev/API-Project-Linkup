import { csrfFetch } from './csrf';

// TYPES
const GET_EVENT_ATTENDEES = '/linkup/attendances/GET_EVENT_ATTENDEES';
const GET_EVENT_ATTENDANCES = '/linkup/attendances/GET_EVENT_ATTENDANCES';
const GET_MY_ATTENDANCES = '/linkup/attendances/GET_MY_ATTENDANCES';
const ADD_ATTENDANCE = '/linkup/attendances/ADD_ATTENDANCE';
const UPDATE_ATTENDANCE = '/linkup/attendances/UPDATE_ATTENDANCE';
const DELETE_ATTENDANCE = '/linkup/attendances/DELETE_ATTENDANCE';

// ACTIONS
const actionGetEventAttendees = (attendees) => ({
    type: GET_EVENT_ATTENDEES,
    payload: attendees
})

const actionGetEventAttendances = (attendances) => ({
    type: GET_EVENT_ATTENDANCES,
    payload: attendances
})

const actionGetMyAttendances = (attendances) => ({
    type: GET_MY_ATTENDANCES,
    payload: attendances
})

const actionAddAttendance = (attendances) => ({
    type: ADD_ATTENDANCE,
    payload: attendances
})

const actionUpdateAttendance = (attendances) => ({
    type: UPDATE_ATTENDANCE,
    payload: attendances
})

const actionDeleteAttendance = (attendances) => ({
    type: DELETE_ATTENDANCE,
    payload: attendances
})


// THUNKS
export const thunkGetEventAttendees = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetEventAttendees(data.Attendees))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetEventAttendances = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendances`)
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetEventAttendances(data.Attendances))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkGetMyAttendances = () => async dispatch => {
    const res = await csrfFetch('/api/attendances');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetMyAttendances(data.Attendances))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkAddAttendance = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'POST'
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddAttendance(data))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkUpdateAttendance = (data, attendeeData) => async dispatch => {
    const res = await csrfFetch(`/api/events/${data.attendance.eventId}/attendance`, {
        method: 'PUT',
        body: JSON.stringify(attendeeData)
    })
    if (res.ok) {
        const attendance = await res.json();
        data.attendee.Attendance.status = attendance.status;
        const payload = {attendance: attendance, attendee: data.attendee}
        dispatch(actionUpdateAttendance(payload))
    } else {
        const errors = await res.json();
        return errors
    }
}

export const thunkDeleteAttendance = (attendance, attendeeData) => async dispatch => {
    const res = await csrfFetch(`/api/events/${attendance.eventId}/attendance`, {
        method: 'DELETE',
        body: JSON.stringify(attendeeData)
    })
    if (res.ok) {
        const message = await res.json();
        dispatch(actionDeleteAttendance(attendance))
        return message
    } else {
        const errors = await res.json();
        return errors
    }
}

// REDUCER

const initialState = { myAttendances: {}, eventAttendances: {}, eventAttendees: {}}
const attendancesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_EVENT_ATTENDEES: {
            const newState = { myAttendances: {...state.myAttendances}, eventAttendances: {...state.eventAttendances}, eventAttendees: {} };
            action.payload.forEach(attendee => newState.eventAttendees[attendee.id] = attendee)
            return newState;
        }
        case GET_EVENT_ATTENDANCES: {
            const newState = { myAttendances: {...state.myAttendances}, eventAttendances: {}, eventAttendees:{...state.eventAttendees}  };
            action.payload.forEach(attendance => newState.eventAttendances[attendance.id] = attendance)
            return newState;
        }
        case GET_MY_ATTENDANCES: {
            const newState = { myAttendances: {}, eventAttendances: {...state.eventAttendances}, eventAttendees:{...state.eventAttendees}};
            action.payload.forEach(attendance => newState.myAttendances[attendance.id] = attendance)
            return newState;
        }
        case ADD_ATTENDANCE: {
            const newState = { eventAttendees: {...state.eventAttendees}, myAttendances: {...state.myAttendances}, eventAttendances:{...state.eventAttendances}  };
            newState.myAttendances = { ...newState.myAttendances, [action.payload.id]: action.payload}
            newState.eventAttendances = { ...newState.eventAttendances, [action.payload.id]: action.payload};
            return newState;
        }
        case UPDATE_ATTENDANCE: {
            const newState = { eventAttendees: {...state.eventAttendees}, myAttendances: {...state.myAttendances}, eventAttendances:{...state.eventAttendances}  };
            newState.eventAttendees = { ...newState.eventAttendees, [action.payload.attendee.id]: action.payload.attendee}
            newState.myAttendances = { ...newState.myAttendances, [action.payload.attendance.id]: action.payload.attendance}
            newState.eventAttendances = { ...newState.eventAttendances, [action.payload.attendance.id]: action.payload.attendance};
            return newState;
        }
        case DELETE_ATTENDANCE: {
            const newState = { eventAttendees: {...state.eventAttendees}, myAttendances: {...state.myAttendances}, eventAttendances:{...state.eventAttendances}  };
            delete newState.eventAttendees[action.payload.userId]
            delete newState.myAttendances[action.payload.id];
            delete newState.eventAttendances[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default attendancesReducer;
