import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { base_animations, child_variants } from '../../../constants/animations';
import { useApp } from '../../../context/AppContext'
import { format , parseISO, isSameDay } from 'date-fns'
import { useQuery } from 'react-query';
import ProfileImage from '../../../components/shared/profileImage'
import { TbHeartFilled, TbHeart, TbEdit, TbX, TbTrash, TbCheck } from 'react-icons/tb';
import { getMyLikes } from '../../../store/auth';
import './styles.scss'

function ChatMessage({chatData}) {
    const [ hovering, setHovering ] = useState(false);

    const {
      chat,
      feed,
      ref,
      content,
      handleInput,
      editing,
      setEditing,
      updateChat,
      deleteChat,
      addLike,
      removeLike
    } = chatData;
    const { auth, theme } = useApp();
    const { data: myLikes } = useQuery(['my-likes'], getMyLikes);
    const likeData = myLikes?.data
    const chatLiked = likeData?.find(like => like.playerId === auth?.id && chat.id === like.entityId)
    const isAuth = auth?.id === chat.playerId
    const today = new Date();
    const createdToday = isSameDay(parseISO(chat.createdAt), today);
    const chatDateFormat = createdToday ? 'p' : 'MM/dd  •  p';
    const formatDate = format(parseISO(chat.createdAt), chatDateFormat);
    const textareaRef = useRef(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height to recompute
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }, [content]);

  return (
    <motion.li
            variants={child_variants}
            {...base_animations}
            ref={ref}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={`chat_item chat_item-${theme} ${editing && `editing_chat-${theme}`}`}>
            <ProfileImage
                size={4}
                player={chat.Player}
            />
            <div className="chat_details">
                <div className="chat_flex">
                    <p className="sm bold accent">{chat.Player.name}</p>
                    <span>&#8226;</span>
                    <p className="xs bold">{formatDate}</p>
                </div>
                <textarea
                    ref={feed ? textareaRef : null}
                    className={`chat_textarea chat_textarea-${theme}`}
                    disabled={!editing}
                    defaultValue={chat.content}
                    onChange={handleInput}
                >
                </textarea>
            </div>
                {
                    isAuth &&
                    <div className="chat_controls">
                    {
                        editing ?
                        <>
                            <div
                                onClick={updateChat}
                                className='chat_control'
                            >
                                <span className='xxs bold success'>Confirm</span>
                                <TbCheck className='success'/>
                            </div>
                            |
                            <div
                                onClick={() => setEditing(false)}
                                className='chat_control'
                            >
                                <span className='xxs bold cancel'>Cancel</span>
                                <TbX className='cancel'/>
                            </div>
                        </>
                        :
                        hovering &&
                        <>
                            <div
                                onClick={() => setEditing(true)}
                                className='chat_control'
                            >
                                <span className='xxs bold'>Edit</span>
                                <TbEdit/>
                            </div>
                            |
                            <div
                                onClick={deleteChat}
                                className='chat_control'
                            >
                                <span className='xxs bold warning'>Delete</span>
                                <TbTrash className='warning'/>
                            </div>
                        </>
                    }
                    </div>
                }
                <div className={`chat_liker chat_liker-${theme}`} onClick={chatLiked ? removeLike : addLike}>
                    <span className='bold xxs'>{`${chat.likes}`}</span>
                    {
                        chatLiked ?
                        <TbHeartFilled className='accent'/>
                        :
                        <TbHeart className='accent'/>
                    }
                </div>
        </motion.li>
  )
}

export default ChatMessage
