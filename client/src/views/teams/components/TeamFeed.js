import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useApp } from '../../../context/AppContext'
import { AnimatePresence, motion } from 'framer-motion';
import { parent_variants, base_animations } from '../../../constants/animations';
import useNewTeamChat from '../hooks/useNewTeamChat';
import useTeamChatWebSocket from '../hooks/useTeamChatWebSocket'
import { useSelector } from 'react-redux'
import ChatItem from './TeamChat'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import Scroll from '../../../components/shared/scroll';


function TeamFeed() {
    const { socket, room } = useTeamChatWebSocket();
    const teamFeed = useSelector(state => state.chats.teamFeed)
    const teamFeedArr = Object.values(teamFeed)
    const { handleInput, content, createTeamChat } = useNewTeamChat({socket, room});
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
        socket.on("update_feed", () => {
            ref.current.scrollTop = ref.current.scrollHeight
        })

        return () => {
            socket.disconnect(); // Close WebSocket connection
        };
    }, [])



    return (
        <Scroll ref={ref}>
            <section className="team_feed container_border">
            <span className='section_label xs bold'>Showing all messages for past 30 days</span>
                {
                    teamFeedArr.length > 0 ?
                    <motion.ul variants={parent_variants} {...base_animations} className="feed_list">
                        <AnimatePresence>
                        {
                            teamFeedArr.map(chat => (
                                <ChatItem
                                    socket={socket}
                                    room={room}
                                    key={chat.id}
                                    chat={chat}
                                />
                            ))
                        }
                        </AnimatePresence>
                    </motion.ul> :
                    <div className="no_chats"></div>
                }

            </section>
            <ChatInput
                handleInput={handleInput}
                content={content}
                create={createTeamChat}
            />
        </Scroll>
    )
}

export default TeamFeed
