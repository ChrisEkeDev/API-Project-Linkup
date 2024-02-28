import { csrfFetch } from './csrf';

export const getMapMarkers = async () => {
    const res = await csrfFetch('/api/places/markers')
    return res
}

export const searchSessions = async (query, sortBy) => {
    const res = await csrfFetch(`/api/sessions/search/?query=${query}&sortBy=${sortBy}`);
    return res
}

export const getSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`);
    return res
}

export const getSessionCheckInStatus = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/current`);
    return res
}

export const getSessionCheckIns = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`)
    return res
}

export const getSessionFeed = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/chat-feed`);
    return res
}

export const getSessionFeedTopComments = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/chat-feed/top-comments`);
    return res
}

export const createSession = async (data) => {
    const res = await csrfFetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res
}

export const updateSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    return res
}

export const deleteSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE'
    })
    return res
}

export const addToSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/add-to-session`, {
        method: 'PUT',
        body: JSON.stringify({playerId: data.playerId})
    });
    return res
}

export const removeFromSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/remove-from-session`, {
        method: 'DELETE',
        body: JSON.stringify({playerId: data.playerId})
    });
    return res
}

export const checkInToSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-in`, {
        method: 'POST'
    })
    return res
}

export const checkOutOfSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-out`, {
        method: 'DELETE'
    })
    return res
}

export const createSessionChat = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/chat-feed`, {
        method: 'POST',
        body: JSON.stringify({content: data.content})
    });
    return res
}

export const updateSessionChat = async (data) => {
    const res = await csrfFetch(`/api/session-chats/${data.chatId}`, {
        method: 'PUT',
        body: JSON.stringify({content: data.content})
    })
    return res
}

export const deleteSessionChat = async (chatId) => {
    const res = await csrfFetch(`/api/session-chats/${chatId}`, {
        method: 'DELETE'
    })
    return res
}
