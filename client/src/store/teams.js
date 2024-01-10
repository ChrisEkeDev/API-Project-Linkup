import { csrfFetch } from './csrf';

// TYPES
const SEARCH_TEAMS = '/linkup/teams/SEARCH_TEAMS';
const GET_MY_TEAMS = '/linkup/teams/GET_MY_TEAMS';
// const GET_SINGLE_TEAM = '/linkup/teams/GET_SINGLE_TEAM';
// const CREATE_TEAM = '/linkup/teams/CREATE_TEAM';
// const UPDATE_TEAM = '/linkup/teams/UPDATE_TEAM';
// const DELETE_TEAM = '/linkup/teams/DELETE_TEAM';



// ACTIONS
const actionSearchTeams = (teams) => ({
    type: SEARCH_TEAMS,
    payload: teams
})

const actionGetMyTeams = (teams) => ({
    type: GET_MY_TEAMS,
    payload: teams
})

// const actionGetSingleTeam = (team) => ({
//     type: GET_SINGLE_TEAM,
//     payload: team
// })

// const actionCreateTeam = (team) => ({
//     type: CREATE_TEAM,
//     payload: team
// })

// const actionUpdateTeam = (team) => ({
//     type: UPDATE_TEAM,
//     payload: team
// })

// const actionDeleteTeam = (team) => ({
//     type: DELETE_TEAM,
//     payload: team
// })


//THUNKS

export const thunkSearchTeams = (query, sortBy) => async dispatch => {
    const res = await csrfFetch(`/api/teams/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const jsonResponse = await res.json();
        await dispatch(actionSearchTeams(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

export const thunkGetMyTeams = () => async dispatch => {
    const res = await csrfFetch('/api/teams/current');
    try {
        const jsonResponse = await res.json();
        await dispatch(actionGetMyTeams(jsonResponse.data))
        return jsonResponse
    } catch(error) {
        console.error(error)
    }
}

// export const thunkGetSingleTeam = (teamId) => async dispatch => {
//     const res = await csrfFetch(`/api/teams/${teamId}`);
//     if (res.ok) {
//         const team = await res.json();
//         dispatch(actionGetSingleTeam(team))
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkCreateTeam = (team, imageData) => async dispatch => {
//     const res = await csrfFetch('/api/teams', {
//         method: 'POST',
//         body: JSON.stringify(team)
//     });

//     if (res.ok) {
//         const newTeam = await res.json();
//         dispatch(actionCreateTeam(newTeam))
//         if (imageData) {
//             await fetch(`/api/teams/${newTeam.id}/images`, {
//                 method: 'POST',
//                 headers: {"XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
//                 body: imageData
//             })
//         }
//         return newTeam;
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkUpdateTeam = (team) => async dispatch => {
//     const res = await csrfFetch(`/api/teams/${team.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(team)
//     });
//     if (res.ok) {
//         const updatedTeam = await res.json();
//         dispatch(actionUpdateTeam(updatedTeam))
//         return updatedTeam
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }

// export const thunkDeleteTeam = (team) => async dispatch => {
//     const res = await csrfFetch(`/api/teams/${team.id}`, {
//         method: 'DELETE'
//     })
//     if (res.ok) {
//         const message = await res.json();
//         dispatch(actionDeleteTeam(team))
//         return message
//     } else {
//         const errors = await res.json();
//         return errors;
//     }
// }


// REDUCER
const initialState = { allTeams: [], singleTeam: {}, myTeams: []};

const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_TEAMS: {
            const newState = { ...state, allTeams: [] }
            action.payload.forEach(team => newState.allTeams.push(team));
            return newState;
        };
        case GET_MY_TEAMS: {
            const newState = { ...state, currentTeams: {} };
            action.payload.forEach(team => newState.myTeams.push(team));
            return newState;
        };
        // case GET_SINGLE_TEAM: {
        //     const newState = { ...state, singleTeam: {} };
        //     newState.singleTeam = action.payload;
        //     return newState
        // };
        // case CREATE_TEAM:
        // case UPDATE_TEAM: {
        //     const newState = { ...state };
        //     newState.allTeams = { ...newState.allTeams, [action.payload.id]: action.payload };
        //     return newState;
        // };
        // case DELETE_TEAM: {
        //     const newState = { ...state };
        //     delete newState.allTeams[action.payload.id];
        //     return newState;
        // };
        default:
            return state;
    }
}

export default teamsReducer;
