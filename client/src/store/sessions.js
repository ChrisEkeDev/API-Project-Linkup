import { csrfFetch } from './csrf';

export const searchSessions = async (query, sortBy) => {
    const res = await csrfFetch(`/api/sessions/search/?query=${query}&sortBy=${sortBy}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckInStatus = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/current`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionCheckIns = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-ins`)
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionFeed = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/chat-feed`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const getSessionFeedTopComments = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/chat-feed/top-comments`);
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const createSession = async (data) => {
    const res = await csrfFetch('/api/sessions', {
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

export const updateSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.id}`, {
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

export const deleteSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const addToSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/add-to-session`, {
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

export const removeFromSession = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/remove-from-session`, {
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

export const checkInToSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-in`, {
        method: 'POST'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const checkOutOfSession = async (sessionId) => {
    const res = await csrfFetch(`/api/sessions/${sessionId}/check-out`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}

export const createSessionChat = async (data) => {
    const res = await csrfFetch(`/api/sessions/${data.sessionId}/chat-feed`, {
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

export const updateSessionChat = async (data) => {
    const res = await csrfFetch(`/api/session-chats/${data.chatId}`, {
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

export const deleteSessionChat = async (chatId) => {
    const res = await csrfFetch(`/api/session-chats/${chatId}`, {
        method: 'DELETE'
    })
    try {
        const json = await res.json();
        return json.data
    } catch(error) {
        console.error(error)
    }
}
