import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useQueryClient } from 'react-query';
const isProduction = process.env.NODE_ENV === 'production';
// import { thunkGetTeamFeed } from "../../../store/chats";

function useTeamChatWebSocket(team) {
    const client = useQueryClient();
    const socketURL = isProduction ? 'https://linkup-api-jw4b.onrender.com/teams' : 'http://localhost:3030/teams';
    const { id } = useParams();
    const [socket, setSocket] = useState(null)
    const { auth } = useApp();
    const room = `Room ${team.name}`

    useEffect(() => {
        const socket = io(socketURL);
        setSocket(socket);

        if ( auth ) {
            socket?.on('connect', () => {
                socket.emit('join_room', room)
                console.log(`${auth.name} has joined the chat`)
            });

            socket?.on('update_feed', async () => {
                client.invalidateQueries(['team-feed'])
            });

            socket?.on('offline', () => {
                console.log(`${auth.name} has left the chat`)
            })
        }

        return () => {
            socket.disconnect();
        };
    }, [])

    return { socket, room }
}

export default useTeamChatWebSocket
