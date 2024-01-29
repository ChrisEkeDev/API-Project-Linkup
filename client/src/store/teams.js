import { csrfFetch } from './csrf';

// TYPES
const GET_ALL_TEAMS = '/backcourts/teams/GET_ALL_TEAMS'
const SEARCH_TEAMS = '/backcourts/teams/SEARCH_TEAMS';
const GET_MY_TEAMS = '/backcourts/teams/GET_MY_TEAMS';
const GET_SINGLE_TEAM = '/backcourts/teams/GET_SINGLE_TEAM';
const GET_TEAM_SESSIONS = '/backcourts/teams/GET_TEAM_SESSIONS'
const CREATE_TEAM = '/backcourts/teams/CREATE_TEAM';
const UPDATE_TEAM = '/backcourts/teams/UPDATE_TEAM';
const DELETE_TEAM = '/backcourts/teams/DELETE_TEAM';

export const searchTeams = async (query, sortBy) => {
    const res = await csrfFetch(`/api/teams/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}


export const getTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getTeamMembershipStatus = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getTeamMemberships = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/memberships`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}



export const getTeamSessions = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/sessions`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getTeamFeed = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/feed`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const createTeam = async (data) => {
    const res = await csrfFetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const updateTeam = async (data, id) => {
    const res = await csrfFetch(`/api/teams/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const deleteTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}



const actionCreateTeam = (team) => ({
    type: CREATE_TEAM,
    payload: team
})

const actionUpdateTeam = (team) => ({
    type: UPDATE_TEAM,
    payload: team
})

const actionDeleteTeam = (team) => ({
    type: DELETE_TEAM,
    payload: team
})


//THUNKS
export const thunkCreateNewTeam = (teamData) => async dispatch => {
    const res = await csrfFetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify(teamData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionCreateTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkUpdateTeam = (teamData, teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        body: JSON.stringify(teamData)
    });
    try {
        const jsonResponse = await res.json();
        await dispatch(actionUpdateTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}

export const thunkDeleteTeam = (teamId) => async dispatch => {
    const res = await csrfFetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
    })
    try {
        const jsonResponse = await res.json();
        await dispatch(actionDeleteTeam(jsonResponse.data));
        return jsonResponse;
    } catch(error) {
        console.error(error)
    }
}


// REDUCER
const initialState = { allTeams:{}, searchedTeams: [], singleTeam: {}, myTeams: {}, teamSessions:{} };

const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_TEAMS: {
            const newState = { ...state, allTeams: {} };
            action.payload.forEach(team => newState.allTeams[team.id] = team);
            return newState;
        }
        case SEARCH_TEAMS: {
            const newState = { ...state, searchedTeams: [] }
            action.payload.forEach(team => newState.searchedTeams.push(team));
            return newState;
        };
        case GET_MY_TEAMS: {
            const newState = { ...state, myTeams: {} };
            action.payload.forEach(team => newState.myTeams[team.id] = team);
            return newState;
        };
        case GET_SINGLE_TEAM:
        case CREATE_TEAM:
        case UPDATE_TEAM: {
            const newState = { ...state, singleTeam: {}  };
            newState.singleTeam = action.payload;
            return newState;
        };
        case GET_TEAM_SESSIONS: {
            const newState = { ...state, teamSessions: {} };
            action.payload.forEach(session => newState.teamSessions[session.id] = session);
            return newState;
        }
        case DELETE_TEAM: {
            const newState = { ...state, myTeams: { ...state.myTeams }  };
            delete newState.myTeams[action.payload.id];
            return newState;
        };
        default:
            return state;
    }
}

export default teamsReducer;
