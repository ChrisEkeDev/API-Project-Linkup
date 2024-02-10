import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const isProduction = process.env.NODE_ENV === 'production';

function useSessionChatWebSocket(session) {
    const socketURL = isProduction ? 'https://linkup-api-jw4b.onrender.com/sessions' : 'http://localhost:3030/sessions';
    const { id } = useParams();
    const [socket, setSocket] = useState(null)
    const { auth } = useApp();
    const room = `Room ${session.name}`

    useEffect(() => {
        const socket = io(socketURL);
        setSocket(socket);

        if (auth) {
            socket?.on('connect', () => {
                socket.emit('join_room', { player: auth.name, room: room })
                console.log(`${auth.name} has joined the chat`)
            });

            socket?.on('update_feed', async () => {
                // await dispatch(thunkGetSessionFeed(sessionId))
            });

            socket?.on('disconnect', () => {
                socket.emit('leave_room', { player: auth.name, room: room })
                console.log(`${auth.name} has left the chat`)
            })
        }

        return () => {
            socket.disconnect(); // Close WebSocket connection
        };
    }, [])





    return { socket, room }
}

export default useSessionChatWebSocket
