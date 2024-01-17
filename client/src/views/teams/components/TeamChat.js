import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { base_animations, child_variants } from '../../../constants/animations';
import IconButton from '../../../components/shared/button/IconButton'
import { useApp } from '../../../context/AppContext'
import { format , parseISO } from 'date-fns'
import useTeamChat from "../hooks/useTeamChat"
import ProfileImage from '../../../components/shared/profileImage'
import { PiPencilSimpleLineFill, PiXBold, PiCheckFatFill, PiTrashBold  } from "react-icons/pi";

function TeamChat(props) {
    const { auth } = useApp();
    const { chat, room, socket } = props;
    const isAuth = auth.id === chat.playerId
    const { ref, content, handleInput, updateTeamChat, deleteTeamChat, editing, setEditing  } = useTeamChat(props)
    const formatDate = format(parseISO(chat.createdAt), 'MM/dd/yy p');
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
                <textarea ref={textareaRef} className="textarea" disabled={!editing} value={content} onChange={handleInput}></textarea>
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
                            action={updateTeamChat}
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
                            action={deleteTeamChat}
                            styles="small_button"
                        />
                    </>
                }
                </div>
            }

        </motion.li>
    )
}

export default TeamChat
