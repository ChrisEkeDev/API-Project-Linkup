import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
// import { thunkGetSessionFeed } from "../../../store/chats";

function useSessionChatWebSocket() {
    const [socket, setSocket] = useState(null)
    const session = useSelector(state => state.sessions.singleSession);
    const { auth, dispatch } = useApp();
    const sessionId = session.id;
    const player = auth.name;
    const room = `Room ${session.name}`

    useEffect(() => {
        const socket = io('http://localhost:3030/sessions');
        setSocket(socket);

        socket?.on('connect', () => {
            socket.emit('join_room', room)
            console.log(`${player} has joined the chat`)
        });

        socket?.on('update_feed', async () => {
            // await dispatch(thunkGetSessionFeed(sessionId))
        });

        socket?.on('offline', () => {
            console.log(`${player} has left the chat`)
        })

        return () => {
            socket.disconnect(); // Close WebSocket connection
        };
    }, [])





    return { socket, room }
}

export default useSessionChatWebSocket
