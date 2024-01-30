import { csrfFetch } from './csrf';

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

export const updateTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.id}`, {
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
