import React, { useEffect, useRef } from 'react'
import { useApp } from '../../../context/AppContext'
import { AnimatePresence, motion } from 'framer-motion';
import { format, parseISO, isSameDay } from 'date-fns';
import { TbHeart, TbHeartFilled } from 'react-icons/tb';
import ProfileImage from '../profileImage';
import './styles.scss'

function ChatMessage({chat}) {
    const { settings } = useApp();
    const settingsData = settings?.data;
    const { theme } = settingsData;
    const today = new Date();
    const createdToday = isSameDay(parseISO(chat.createdAt), today);
    const chatDateFormat = createdToday ? 'p' : 'MM/dd  •  p';
    const formatDate = format(parseISO(chat.createdAt), chatDateFormat);

  return (
    <li key={chat.id} className={`chat_item chat_item-${theme}`}>
        <ProfileImage
            size={4}
            player={chat.Player}
        />
        <div className="chat_details">
            <div className="chat_flex">
                <p className="sm bold">{chat.Player.name}</p>
                <span>&#8226;</span>
                <p className="xs bold">{formatDate}</p>
            </div>
            <textarea className="chat_textarea" disabled={true} value={chat.content}></textarea>
        </div>
        {/* <div className='chat_likes'>
          { chatLiked ? <TbHeartFilled className="icon"/> : <TbHeart className='icon'/> }
          <p className='xs bold'>{chat.likes}</p>
        </div> */}
    </li>
  )
}

export default ChatMessage
