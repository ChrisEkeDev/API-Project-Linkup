import { csrfFetch } from './csrf';


// TYPES
const GET_GROUP_MEMBERS = '/linkup/memberships/GET_GROUP_MEMBERS'
const GET_GROUP_MEMBERSHIPS = '/linkup/memberships/GET_GROUP_MEMBERSHIPS'
const GET_MY_MEMBERSHIPS = '/linkup/memberships/GET_MY_MEMBERSHIPS'
const ADD_MEMBERSHIP = '/linkup/memberships/ADD_MEMBERSHIP'
const UPDATE_MEMBERSHIP = '/linkup/memberships/UPDATE_MEMBERSHIP'
const DELETE_MEMBERSHIP = '/linkup/memberships/DELETE_MEMBERSHIP'


// ACTIONS

const actionGetGroupMembers = (members) => ({
    type: GET_GROUP_MEMBERS,
    payload: members
})

const actionGetGroupMemberships = (memberships) => ({
    type: GET_GROUP_MEMBERSHIPS,
    payload: memberships
})

const actionGetMyMemberships = (memberships) => ({
    type: GET_MY_MEMBERSHIPS,
    payload: memberships
})

const actionAddMembership = (membership) => ({
    type: ADD_MEMBERSHIP,
    payload: membership
})

const actionUpdateMembership = (membership) => ({
    type: UPDATE_MEMBERSHIP,
    payload: membership
})

const actionDeleteMembership = (membership) => ({
    type: DELETE_MEMBERSHIP,
    payload: membership
})


// THUNKS

export const thunkGetGroupMembers = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/members`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetGroupMembers(data.Members))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkGetGroupMemberships = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/memberships`);
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetGroupMemberships(data.Memberships))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}

export const thunkGetMyMemberships = () => async dispatch => {
    const res = await csrfFetch('/api/memberships');
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetMyMemberships(data.Memberships))
    } else {
        const errors = await res.json();
        console.log(errors)
    }
}


export const thunkAddMembership = (groupId) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'POST'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(actionAddMembership(data))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateMembership = (membership, memberData) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${membership.groupId}/membership`, {
        method: 'PUT',
        body: JSON.stringify(memberData)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(actionUpdateMembership(data))
    } else {
        const errors = res.json();
        return errors;
    }
}

export const thunkDeleteMembership = (membership, memberData) => async dispatch => {
    const res = await csrfFetch(`/api/groups/${membership.groupId}/membership`, {
        method: 'DELETE',
        body: JSON.stringify(memberData)
    });
    if (res.ok) {
        const message = res.json();
        dispatch(actionDeleteMembership(membership))
        return message;
    } else {
        const errors = res.json();
        return errors;
    }
}



// REDUCER

const initialState = { myMemberships: {}, groupMemberships:{}, groupMembers: {} }
const membershipsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GROUP_MEMBERS: {
            const newState = { myMemberships: {...state.myMemberships}, groupMemberships: {...state.groupMemberships}, groupMembers: {}};
            action.payload.forEach(member => newState.groupMembers[member.id] = member)
            return newState;
        };
        case GET_GROUP_MEMBERSHIPS: {
            const newState = { myMemberships: {...state.myMemberships}, groupMemberships: {}, groupMembers: {...state.groupMembers}}
            action.payload.forEach(membership => newState.groupMemberships[membership.id] = membership);
            return newState;
        }
        case GET_MY_MEMBERSHIPS: {
            const newState = { myMemberships: {}, groupMemberships: {...state.groupMemberships}, groupMembers: {...state.groupMembers}}
            action.payload.forEach(membership => newState.myMemberships[membership.id] = membership);
            return newState;
        }
        case ADD_MEMBERSHIP:
        case UPDATE_MEMBERSHIP: {
            const newState = { groupMembers: {},  myMemberships: {...state.myMemberships}, groupMemberships: {...state.groupMemberships} };
            newState.myMemberships = {...newState.myMemberships, [action.payload.id]: action.payload};
            newState.groupMemberships = {...newState.groupMemberships, [action.payload.id]: action.payload}
            return newState;
        }
        case DELETE_MEMBERSHIP: {
            const newState = { groupMembers: {}, myMemberships: {...state.myMemberships}, groupMemberships: {...state.groupMemberships} };
            delete newState.myMemberships[action.payload.id];
            delete newState.groupMemberships[action.payload.id];
            return newState;
        }
        default:
            return state;
    }
}

export default membershipsReducer;
