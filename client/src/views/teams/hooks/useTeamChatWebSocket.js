import React, { useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { thunkGetTeamFeed } from "../../../store/chats";

function useTeamChatWebSocket() {
    const team = useSelector(state => state.teams.singleTeam);
    const { auth, dispatch } = useApp();
    const teamId = team.id;
    const player = auth.name;
    const socket = io('http://localhost:3030/team');
    const room = `Room ${team.name}`

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join_room', room)
            console.log(`${player} has joined the chat`)
        });

        socket.on('update_feed', async () => {
            await dispatch(thunkGetTeamFeed(teamId))
        });

        socket.on('offline', () => {
            console.log(`${player} has left the chat`)
        })

          return () => socket.disconnect();
    }, [])

    return { socket, room }
}

export default useTeamChatWebSocket
