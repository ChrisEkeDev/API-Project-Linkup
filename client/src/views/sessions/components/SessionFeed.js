import React, { useEffect, useRef } from 'react';
import List from '../../../components/shared/layout/List';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useSessionChat from '../hooks/useSessionChat';
import useSessionChatWebSocket from '../hooks/useSessionChatWebSocket'
import SessionChat from './SessionChat'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import Scroll from '../../../components/shared/scroll';
import LoadingData from '../../../components/shared/loading';
import { TbMessage2 } from 'react-icons/tb';
import { getSessionFeed, getSessionCheckInStatus } from '../../../store/sessions';
import SectionContainer from '../../../components/shared/layout/SectionContainer';
import NoContent from '../../../components/shared/noContent';

function SessionFeed({session}) {
    const { id } = useParams();
    const { socket, room } = useSessionChatWebSocket(session);
    const { data: feed, error: feedErr, isLoading: feedLoading } = useQuery(['session-feed', id], () => getSessionFeed(id));
    const { data: checkIn } = useQuery(['check-in-status'], () => getSessionCheckInStatus(id))
    const { handleInput, content, onCreateSessionChat } = useSessionChat({socket, room})
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

    const feedData = feed?.data;
    const checkInData = checkIn?.data;

    return (
        <Scroll ref={ref} styles='feed_scroll'>
            <SectionContainer title="Showing all messages for this session">
                {
                    feedData.length > 0 ?
                    <List pad>
                        {
                            feedData.map(chat => (
                                <SessionChat
                                    socket={socket}
                                    room={room}
                                    key={chat.id}
                                    chat={chat}
                                />
                            ))
                        }
                    </List> :
                    <NoContent
                        icon={TbMessage2}
                        message='No Messages Yet'
                    />
                }
            </SectionContainer>
            { checkInData && checkInData !== 'pending' ?
                <ChatInput
                    handleInput={handleInput}
                    content={content}
                    create={onCreateSessionChat}
                /> :
                null
            }
        </Scroll>
    )
}

export default SessionFeed
