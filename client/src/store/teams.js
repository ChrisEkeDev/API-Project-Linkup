import { csrfFetch } from './csrf';

export const searchTeams = async (query, sortBy) => {
    const res = await csrfFetch(`/api/teams/search/?query=${query}&sortBy=${sortBy}`);
    return res
}


export const getTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}`);
    return res
}

export const getTeamMembershipStatus = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/current`);
    return res
}

export const getTeamMemberships = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/memberships`)
    return res
}



export const getTeamSessions = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/sessions`)
    return res
}

export const getTeamFeed = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/chat-feed`);
    return res
}

export const getTeamFeedTopComments = async (teamId) => {
    const res = await csrfFetch(`/api/teams/${teamId}/chat-feed/top-comments`);
    return res
}

export const createTeam = async (data) => {
    const res = await csrfFetch('/api/teams', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res
}

export const updateTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    return res
}

export const deleteTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}`, {
        method: 'DELETE'
    })
    return res
}


export const requestToJoinTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/join-team`, {
        method: 'POST'
    });
    return res
}

export const requestToLeaveTeam = async (id) => {
    const res = await csrfFetch(`/api/teams/${id}/leave-team`, {
        method: 'DELETE',
    });
    return res
}

export const addToTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/add-to-team`, {
        method: 'PUT',
        body: JSON.stringify({playerId: data.playerId})
    });
    return res
}

export const removeFromTeam = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/remove-from-team`, {
        method: 'DELETE',
        body: JSON.stringify({playerId: data.playerId})
    });
    return res
}

export const promoteToCoHost = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/promote-to-co-host`, {
        method: 'PUT',
        body: JSON.stringify({playerId: data.playerId})
    });
    return res
}

export const createTeamChat = async (data) => {
    const res = await csrfFetch(`/api/teams/${data.teamId}/chat-feed`, {
        method: 'POST',
        body: JSON.stringify({content: data.content})
    });
    return res
}

export const updateTeamChat = async (data) => {
    const res = await csrfFetch(`/api/team-chats/${data.chatId}`, {
        method: 'PUT',
        body: JSON.stringify({content: data.content})
    })
    return res
}

export const deleteTeamChat = async (chatId) => {
    const res = await csrfFetch(`/api/team-chats/${chatId}`, {
        method: 'DELETE'
    })
    return res
}
