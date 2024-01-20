import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useApp } from '../../../context/AppContext'
import { AnimatePresence, motion } from 'framer-motion';
import { parent_variants, base_animations } from '../../../constants/animations';
import { useSelector } from 'react-redux';
import useNewSessionChat from '../hooks/useNewSessionChat';
import useSessionChatWebSocket from '../hooks/useSessionChatWebSocket'
import SessionChat from './SessionChat'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import Scroll from '../../../components/shared/scroll';
import { PiChatsCircle } from 'react-icons/pi'

function SessionFeed() {
    const { socket, room } = useSessionChatWebSocket();
    const sessionFeed = useSelector(state => state.chats.sessionFeed)
    const sessionFeedArr = Object.values(sessionFeed);
    const { handleInput, content, createSessionChat } = useNewSessionChat({socket, room});
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
        socket.on("update_feed", () => {
            ref.current.scrollTop = ref.current.scrollHeight
        })

        return () => {
            socket.disconnect(); // Close WebSocket connection
        }
    }, [])

    return (
        <Scroll ref={ref}>
            <section className="team_feed container_border">
                <span className='section_label xs bold'>Showing all messages for this session</span>
                {
                    sessionFeedArr.length > 0 ?
                    <motion.ul variants={parent_variants} {...base_animations} className="feed_list">
                        <AnimatePresence>
                        {
                            sessionFeedArr.map(chat => (
                                <SessionChat
                                    socket={socket}
                                    room={room}
                                    key={chat.id}
                                    chat={chat}
                                />
                            ))
                        }
                        </AnimatePresence>
                    </motion.ul> :
                    <div className="no_content">
                        <PiChatsCircle className='icon'/>
                        <p className='sm bold'>No Messages Yet</p>
                    </div>
                }

            </section>
            <ChatInput
                handleInput={handleInput}
                content={content}
                create={createSessionChat}
            />
        </Scroll>
    )
}

export default SessionFeed
