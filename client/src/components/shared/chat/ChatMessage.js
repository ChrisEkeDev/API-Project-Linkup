import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import ProfileImage from '../profileImage';

function ChatMessage({chat}) {
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
            <textarea className="textarea" disabled={true} value={chat.content}></textarea>
        </div>
    </li>
  )
}

export default ChatMessage
