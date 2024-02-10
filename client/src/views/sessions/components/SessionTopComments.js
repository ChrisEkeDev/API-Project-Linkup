import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ChatMessage from '../../../components/shared/chat/ChatMessage'
import { TbMessageCircle  } from 'react-icons/tb';
import { getSessionFeedTopComments } from '../../../store/sessions';
import LoadingData from '../../../components/shared/loading';

function SessionTopComments() {
    const { id } = useParams();
    const { data: topComments, error: topCommentsErr, isLoading: topCommentsLoading } = useQuery(['session-feed-top-comments', id], () => getSessionFeedTopComments(id));

    if (topCommentsLoading) return <LoadingData />

    return (
        <section className="container_border">
                <span className='section_label xs bold'>Top Comments</span>
                {
                    topComments?.length > 0 || topCommentsErr ?
                    <ul className="chat_preview">
                        {
                            topComments.map(chat => (
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

export default SessionTopComments
