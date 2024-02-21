import React, { useEffect, useRef } from 'react';
import List from '../../../components/shared/layout/List';
import useTeamChat from '../hooks/useTeamChat';
import useTeamChatWebSocket from '../hooks/useTeamChatWebSocket'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TeamChat from './TeamChat'
import ChatInput from '../../../components/shared/inputs/ChatInput'
import Scroll from '../../../components/shared/scroll';
import LoadingData from '../../../components/shared/loading';
import { TbMessage2 } from 'react-icons/tb';
import { getTeamFeed, getTeamMembershipStatus } from '../../../store/teams';
import SectionContainer from '../../../components/shared/layout/SectionContainer';

function TeamFeed({team}) {
    const { id } = useParams();
    const { socket, room } = useTeamChatWebSocket(team);
    const { data: feed, error: feedErr, isLoading: feedLoading } = useQuery(['team-feed', id], () => getTeamFeed(id));
    const { data: membership } = useQuery(['membership-status'], () => getTeamMembershipStatus(id))
    const { handleInput, content, onCreateTeamChat } = useTeamChat({socket, room})
    const ref = useRef(null)

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
    const membershipData = membership?.data;

    return (
        <Scroll ref={ref}>
            <SectionContainer title='Showing all messages for past 30 days'>
                {
                    feedData.length > 0 ?
                    <List>
                        {
                            feedData.map(chat => (
                                <TeamChat
                                    socket={socket}
                                    room={room}
                                    key={chat.id}
                                    chat={chat}
                                />
                            ))
                        }
                    </List> :
                    <div className="no_content">
                        <TbMessage2 className='icon'/>
                        <p className='sm bold'>No Messages Yet</p>
                    </div>
                }
            </SectionContainer>
            {
                membershipData && membershipData !== 'pending' ?
                <ChatInput
                    handleInput={handleInput}
                    content={content}
                    create={onCreateTeamChat}
                /> :
                null
            }
        </Scroll>
    )
}

export default TeamFeed
