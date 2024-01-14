import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useApp } from '../../../context/AppContext'
import { AnimatePresence, motion } from 'framer-motion';
import useNewTeamChat from '../hooks/useNewTeamChat';
import { useSelector } from 'react-redux'
import ChatItem from './ChatItem'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import { thunkGetTeamFeed } from '../../../store/chats';

function TeamFeed({socket}) {
    const teamFeed = useSelector(state => state.chats.teamFeed)
    const teamFeedArr = Object.values(teamFeed)
    const { handleInput, content, createTeamChat } = useNewTeamChat(socket);

    return (
        <section className="team_feed">
            {
                teamFeedArr.length > 0 ?
                <ul className="feed_list">
                    {
                        teamFeedArr.map(message => (
                            <ChatItem key={message.id} message={message}/>
                        ))
                    }
                </ul> :
                <div className="no_chats"></div>
            }
            <ChatInput
                handleInput={handleInput}
                content={content}
                createTeamChat={createTeamChat}
            />
        </section>
    )
}

function TeamFeedWrapper() {
    const team = useSelector(state => state.teams.singleTeam)
    const socket = io('http://localhost:3030/team');
    const { auth, dispatch } = useApp()

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join_room', {room: team.id})
        });

        socket.on('update_feed', async () => {
            await dispatch(thunkGetTeamFeed(team.id))
        });

        socket.on('offline', (message) => {
            console.log(`${auth.name} ${message}`)
        })

        return () => socket.disconnect();
    }, [])

    return (
        <TeamFeed socket={socket} />
    )
}

export default TeamFeedWrapper
