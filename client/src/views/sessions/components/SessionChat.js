import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { base_animations, child_variants } from '../../../constants/animations';
import IconButton from '../../../components/shared/button/IconButton'
import { useApp } from '../../../context/AppContext'
import { format , parseISO, isSameDay } from 'date-fns'
import useSessionChat from "../hooks/useSessionChat"
import ProfileImage from '../../../components/shared/profileImage'
import { PiHeartBold, PiHeartFill, PiPencilSimpleLineFill, PiXBold, PiCheckFatFill, PiTrashBold  } from "react-icons/pi";

function SessionChat(props) {
    const { auth } = useApp();
    const { chat, room, socket } = props;
    const myLikes = useSelector(state => state.chats.myLikes)
    const myLikesArr = Object.values(myLikes)
    const chatLiked = myLikesArr.find(like => like.playerId === auth.id && chat.id === like.entityId)
    const isAuth = auth.id === chat.playerId
    const { ref, content, handleInput, updateSessionChat, deleteSessionChat, editing, setEditing, addLike, removeLike } = useSessionChat(props)
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
        <motion.li variants={child_variants} {...base_animations} ref={ref} className="chat_item">
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
                <textarea ref={textareaRef} className="chat_textarea" disabled={!editing} value={content} onChange={handleInput}></textarea>
            </div>
            {
                isAuth &&
                <div className="chat_controls">
                {
                    editing ?
                    <>
                        <IconButton
                            icon={PiXBold}
                            action={() => setEditing(false)}
                            styles="small_button"
                        />
                        <IconButton
                            icon={PiCheckFatFill }
                            action={updateSessionChat}
                            styles="small_button"
                        />
                    </>
                    :
                    <>
                        <IconButton
                            icon={PiPencilSimpleLineFill}
                            action={() => setEditing(true)}
                            styles="small_button"
                        />
                        <IconButton
                            icon={PiTrashBold}
                            action={deleteSessionChat}
                            styles="small_button"
                        />
                    </>
                }
                </div>
            }
            <div className='chat_likes' onClick={chatLiked ? removeLike : addLike }>
                { chatLiked ? <PiHeartFill className="icon"/> : <PiHeartBold className='icon'/> }
                <p className='xs bold'>{chat.likes}</p>
            </div>
        </motion.li>
    )
}

export default SessionChat
