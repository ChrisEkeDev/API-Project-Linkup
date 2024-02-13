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
    const res = await csrfFetch(`/api/teams/${id}/chat-feed`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getTeamFeedTopComments = async (teamId) => {
    const res = await csrfFetch(`/api/teams/${teamId}/chat-feed/top-comments`);
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


export const requestToJoinTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/join-team`, {
        method: 'POST'
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const requestToLeaveTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/leave-team`, {
        method: 'DELETE',
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const addToTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/add-to-team`, {
        method: 'PUT',
        body: JSON.stringify({playerId: data.playerId})
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const removeFromTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/remove-from-team`, {
        method: 'DELETE',
        body: JSON.stringify({playerId: data.playerId})
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const promoteToCoHost = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/promote-to-co-host`, {
        method: 'PUT',
        body: JSON.stringify({playerId: data.playerId})
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const createTeamChat = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/chat-feed`, {
        method: 'POST',
        body: JSON.stringify({content: data.content})
    });
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const updateTeamChat = async (data) => {
    const res = await csrfFetch(`/api/team-chats/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({content: data.content})
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const deleteTeamChat = async (id) => {
    const res = await csrfFetch(`/api/team-chats/${id}`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}
