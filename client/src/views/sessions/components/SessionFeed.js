import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { parent_variants, base_animations } from '../../../constants/animations';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useApp } from '../../../context/AppContext'
import useNewSessionChat from '../hooks/useNewSessionChat';
import useSessionChatWebSocket from '../hooks/useSessionChatWebSocket'
import SessionChat from './SessionChat'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import Scroll from '../../../components/shared/scroll';
import LoadingData from '../../../components/shared/loading';
import { PiChatsCircle } from 'react-icons/pi'
import { getSessionFeed } from '../../../store/sessions';

function SessionFeed({session}) {
    const { id } = useParams();
    const { auth } = useApp();
    const { socket, room } = useSessionChatWebSocket(session);
    const { data: feed, error: feedErr, isLoading: feedLoading } = useQuery(['session-feed', id], () => getSessionFeed(id));
    const { handleInput, content, createSessionChat } = useNewSessionChat({session, socket, room});
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight
        }
        socket?.on("update_feed", () => {
            ref.current.scrollTop = ref.current.scrollHeight
        })
    }, [])

    if (socket === null || feedLoading) return <LoadingData />
    if (feedErr) return <div>Error.</div>

    return (
        <Scroll ref={ref}>
            <section className="team_feed container_border">
                <span className='section_label xs bold'>Showing all messages for this session</span>
                {
                    feed.length > 0 ?
                    <motion.ul variants={parent_variants} {...base_animations} className="feed_list">
                        <AnimatePresence>
                        {
                            feed.map(chat => (
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
            { auth ?
                <ChatInput
                    handleInput={handleInput}
                    content={content}
                    create={createSessionChat}
                /> :
                null
            }

        </Scroll>
    )
}

export default SessionFeed
