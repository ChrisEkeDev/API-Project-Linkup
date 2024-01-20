import React, { useEffect, useRef } from 'react'
import { useApp } from '../../../context/AppContext'
import { AnimatePresence, motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi'
import ProfileImage from '../profileImage';
import './styles.scss'
import { useSelector } from 'react-redux';

function ChatMessage({chat}) {
    const { auth } = useApp();
    const myLikes = useSelector(state => state.chats.myLikes)
    const myLikesArr = Object.values(myLikes)
    const chatLiked = myLikesArr.find(like => like.playerId === auth.id && chat.id === like.entityId)

  return (
    <li key={chat.id} className="chat_item">
        <ProfileImage
            size={4}
            player={chat.Player}
        />
        <div className="chat_details">
            <div className="chat_flex">
                <p className="sm bold">{chat.Player.name}</p>
                <span>&#8226;</span>
                <p className="xs bold">{format(parseISO(chat.createdAt), 'MM/dd/yy p')}</p>
            </div>
            <textarea className="chat_textarea" disabled={true} value={chat.content}></textarea>
        </div>
        <div className='chat_likes'>
          { chatLiked ? <PiHeartFill className="icon"/> : <PiHeartBold className='icon'/> }
          <p className='xs bold'>{chat.likes}</p>
        </div>
    </li>
  )
}

export default ChatMessage
