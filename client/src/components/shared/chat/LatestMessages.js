import React from 'react'
import SectionContainer from '../../../components/shared/layout/SectionContainer'
import List from '../../../components/shared/layout/List'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ChatMessage from './ChatMessage'
import { TbMessageCircle  } from 'react-icons/tb';
import { getTeamFeedTopComments } from '../../../store/teams';
import NoContent from '../noContent';

function TeamTopComments() {
    const { id } = useParams();
    const {
        data: topComments,
        error: topCommentsErr,
        isLoading: topCommentsLoading
    } = useQuery(['team-feed-top-comments', id], () => getTeamFeedTopComments(id));

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
            </List>
             :
             <NoContent
                 icon={TbMessageCircle}
                 message='No Messages Yet'
             />
            }
        </SectionContainer>
    )
}

export default TeamTopComments
