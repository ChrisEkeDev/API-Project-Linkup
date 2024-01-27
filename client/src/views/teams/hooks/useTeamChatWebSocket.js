import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
// import { thunkGetTeamFeed } from "../../../store/chats";

function useTeamChatWebSocket() {
    const [socket, setSocket] = useState(null)
    const team = useSelector(state => state.teams.singleTeam);
    const { auth, dispatch } = useApp();
    const teamId = team.id;
    const player = auth.name;
    const room = `Room ${team.name}`

    useEffect(() => {
        const socket = io('http://localhost:3030/teams');
        setSocket(socket);

        socket?.on('connect', () => {
            socket.emit('join_room', room)
            console.log(`${player} has joined the chat`)
        });

        socket?.on('update_feed', async () => {
            // await dispatch(thunkGetTeamFeed(teamId))
        });

        socket?.on('offline', () => {
            console.log(`${player} has left the chat`)
        })

        return () => {
            socket.disconnect();
        };
    }, [])

    return { socket, room }
}

export default useTeamChatWebSocket
