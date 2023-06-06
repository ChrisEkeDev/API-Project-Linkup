import { csrfFetch } from './csrf';


// TYPES
const GET_MEMBERS = '/linkup/memberships/GET_MEMBERS'


// ACTIONS

const actionGetMembers = (members) => ({
    type: GET_MEMBERS,
    payload: members
})



// THUNKS

export const thunkGetMembers = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetMembers(data.Members))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}



// REDUCER

const initialState = { }
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MEMBERS: {
            const newState = { ...state };
            action.payload.forEach(member => newState[member.id] = member)
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
