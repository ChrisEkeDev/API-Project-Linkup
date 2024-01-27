import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const isProduction = process.env.NODE_ENV === 'production';
// import { thunkGetTeamFeed } from "../../../store/chats";

function useTeamChatWebSocket() {
    const socketURL = isProduction ? 'https://linkup-api-jw4b.onrender.com/teams' : 'http://localhost:3030/teams';
    const { id } = useParams();
    const [socket, setSocket] = useState(null)
    const team = useSelector(state => state.teams.singleTeam);
    const { auth, dispatch } = useApp();
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
                // await dispatch(thunkGetTeamFeed(teamId))
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
