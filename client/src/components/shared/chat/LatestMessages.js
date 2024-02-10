import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ChatMessage from './ChatMessage'
import { TbMessageCircle  } from 'react-icons/tb';
import { getSessionFeedTopComments } from '../../../store/sessions';

function LatestMessages({entity}) {
    const { id } = useParams();
    const { data: topComments, error: topCommentsErr, isLoading: topCommentsLoading } = useQuery(['session-feed-top-comments', id], () => getSessionFeedTopComments(id));

    return (
        <section className="container_border">
            <span className='section_label xs bold'>Top Comments</span>
            {
                entity?.TeamChats?.length > 0  ||
                entity?.SessionChats?.length > 0
                ?
                <ul className="chat_preview">
                    {
                        entity.TeamChats ?
                        entity.TeamChats.map(chat => (
                            <ChatMessage key={chat.id} chat={chat}/>
                        )) :
                        entity.SessionChats.map(chat => (
                            <ChatMessage key={chat.id} chat={chat}/>
                        ))
                    }
                </ul> :
                <div className='no_content'>
                    <TbMessageCircle  className='icon'/>
                    <p className='sm bold'>No Messages Yet</p>
                </div>
            }
        </section>
    )
}

export default LatestMessages
