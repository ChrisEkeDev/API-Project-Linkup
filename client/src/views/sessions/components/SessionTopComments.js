import React from 'react'
import { useQuery } from 'react-query';
import SectionContainer from '../../../components/shared/layout/SectionContainer'
import List from '../../../components/shared/layout/List'
import { useParams } from 'react-router-dom';
import ChatMessage from '../../../components/shared/chat/ChatMessage'
import { TbMessageCircle  } from 'react-icons/tb';
import { getSessionFeedTopComments } from '../../../store/sessions';
import NoContent from '../../../components/shared/noContent';

function SessionTopComments() {
    const { id } = useParams();
    const {
        data: topComments,
        error: topCommentsErr,
        isLoading: topCommentsLoading
    } = useQuery(['session-feed-top-comments', id], () => getSessionFeedTopComments(id));

    if (topCommentsLoading) return <div>Loading...</div>
    if (topCommentsErr) return <div>Error!</div>

    const topCommentsData = topComments.data;

    return (
        <SectionContainer title='Top Comments'>
                {
                    topCommentsData?.length > 0 || topCommentsErr ?
                    <List>
                        {
                            topCommentsData.map(chat => (
                                <ChatMessage key={chat.id} chat={chat}/>
                            ))
                        }
                    </List> :
                    <NoContent
                        icon={TbMessageCircle}
                        message='No Messages Yet'
                    />
                }
            </SectionContainer>
    )
}

export default SessionTopComments
