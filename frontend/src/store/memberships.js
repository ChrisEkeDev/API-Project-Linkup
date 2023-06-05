import { csrfFetch } from './csrf';


// TYPES
const GET_MEMBERS = '/linkup/memberships/GET_MEMBERS'


// ACTIONS

const actionGetMembers = (members) => ({
    type: GET_MEMBERS,
    payload: members
})



// THUNKS

export const thunkGetMembers = (group) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${group.id}/members`);
    if (res.ok) {
        const data = await res.json();
        console.log(data)
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}



// REDUCER
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MEMBERS: {
            const newState = { ...state };
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
