import React from 'react'
import { format , parseISO } from 'date-fns'
import ProfileImage from '../../../components/shared/profileImage'

function ChatItem({message}) {
    const formatDate = format(parseISO(message.createdAt), 'p')
    return (
        <div className="chat_item">
            <ProfileImage
                size={4}
                player={message.Player}
            />
            <div>
                <p className="xs bold">{message.Player.name} &#8226; {formatDate} </p>
                <p>{message.content}</p>
            </div>
        </div>
    )
}

export default ChatItem
