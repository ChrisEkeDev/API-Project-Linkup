import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { base_animations, child_variants } from '../../../constants/animations';
import IconButton from '../../../components/shared/button/IconButton'
import { useApp } from '../../../context/AppContext'
import { format , parseISO, isSameDay } from 'date-fns'
import useTeamChat from '../hooks/useTeamChat'
import Modal from '../../../components/shared/modal';
import { useQuery } from 'react-query';
import useModal from '../../../hooks/useModal';
import ProfileImage from '../../../components/shared/profileImage'
import { PiHeartFill, PiHeartBold, PiPencilSimpleLineFill, PiXBold, PiCheckFatFill, PiTrashBold  } from "react-icons/pi";
import { getMyLikes } from '../../../store/auth';
import DeleteTeamChatModal from './DeleteTeamChatModal';

function TeamChat(props) {
    const { auth } = useApp();
    const { chat, room, socket } = props;
    const { data: myLikes } = useQuery(['my-likes'], getMyLikes);
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const chatLiked = myLikes?.find(like => like.playerId === auth?.id && chat.id === like.entityId)
    const isAuth = auth?.id === chat.playerId
    const today = new Date();
    const createdToday = isSameDay(parseISO(chat.createdAt), today);
    const chatDateFormat = createdToday ? 'p' : `MM/dd  •  p`;
    const formatDate = format(parseISO(chat.createdAt), chatDateFormat);
    const textareaRef = useRef(null);

    const {
        ref,
        content,
        handleInput,
        editing,
        setEditing,
        onUpdateTeamChat,
        onDeleteTeamChat,
        onAddTeamChatLike,
        onRemoveTeamChatLike
    } = useTeamChat({chat, socket, room})

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto'; // Reset height to recompute
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }, [content]);

    return (
        <>
        <motion.li
            variants={child_variants}
            {...base_animations}
            ref={ref}
            className="chat_item">
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
                <textarea
                    ref={textareaRef}
                    className="chat_textarea"
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
                        <IconButton
                            icon={PiXBold}
                            action={() => setEditing(false)}
                            styles="small_button"
                        />
                        <IconButton
                            icon={PiCheckFatFill }
                            action={onUpdateTeamChat}
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
                            action={onOpenModal}
                            styles="small_button"
                        />
                    </>
                }
                </div>
            }
            <div className='chat_likes' onClick={chatLiked ? onRemoveTeamChatLike : onAddTeamChatLike }>
                { chatLiked ? <PiHeartFill className="icon"/> : <PiHeartBold className='icon'/> }
                <p className='xs bold'>{chat.likes}</p>
            </div>
        </motion.li>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <DeleteTeamChatModal
                chat={chat}
                deleteChat={onDeleteTeamChat}
                close={onCloseModal}
            />
        </Modal>
        </>
    )
}

export default TeamChat
