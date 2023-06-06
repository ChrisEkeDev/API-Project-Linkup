import { csrfFetch } from './csrf';

// TYPES
const GET_CURRENT_ATTENDEES = '/linkup/attendances/GET_CURRENT_ATTENDANCES';


// ACTIONS
const actionGetCurrentAttendees = (attendees) => ({
    type: GET_CURRENT_ATTENDEES,
    payload: attendees
})


// THUNKS
export const thunkGetAttendees = (eventId) => async dispatch => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetCurrentAttendees(data.Attendees))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}


// REDUCER

const initialState = { currentAttendees: {} }
const attendancesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CURRENT_ATTENDEES: {
            const newState = { ...state };
            action.payload.forEach(attendee => newState.currentAttendees[attendee.id] = attendee)
            return newState;
        }
        default:
            return state;
    }
}

export default attendancesReducer;
