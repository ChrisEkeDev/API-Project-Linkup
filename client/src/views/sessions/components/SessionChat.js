import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { base_animations, child_variants } from '../../../constants/animations';
import IconButton from '../../../components/shared/button/IconButton'
import { useApp } from '../../../context/AppContext'
import { format , parseISO, isSameDay } from 'date-fns'
import Modal from '../../../components/shared/modal';
import useModal from '../../../hooks/useModal';
import useSessionChat from "../hooks/useSessionChat"
import ProfileImage from '../../../components/shared/profileImage'
import { TbHeart, TbHeartFilled, TbEdit, TbCheck, TbTrash, TbX } from 'react-icons/tb';
import { useQuery } from 'react-query';
import { getMyLikes } from '../../../store/auth';
import DeleteSessionChatModal from './DeleteSessionChatModal';

function SessionChat(props) {
    const { auth, theme } = useApp();
    const { chat, room, socket } = props;
    const { data: myLikes } = useQuery(['my-likes'], getMyLikes);
    const likesData = myLikes?.data;
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const chatLiked = likesData?.find(like => like.playerId === auth?.id && chat.id === like.entityId)
    const isAuth = auth?.id === chat.playerId
    const today = new Date();
    const createdToday = isSameDay(parseISO(chat.createdAt), today);
    const chatDateFormat = createdToday ? 'p' : 'MM/dd  •  p';
    const formatDate = format(parseISO(chat.createdAt), chatDateFormat);
    const textareaRef = useRef(null);
    const {
        ref,
        content,
        handleInput,
        editing,
        setEditing,
        onUpdateSessionChat,
        onDeleteSessionChat,
        onAddSessionChatLike,
        onRemoveSessionChatLike
    } = useSessionChat({chat, socket, room})

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [content]);

    return (
        <>
        <motion.li
            variants={child_variants}
            {...base_animations}
            ref={ref}
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
                    ref={textareaRef}
                    className={`chat_textarea chat_textarea-${theme}`}
                    disabled={!editing}
                    defaultValue={chat.content}
                    onChange={handleInput}
                >
                </textarea>
            </div>

                <div className="chat_controls">
                {
                isAuth &&
                <>
                {
                    editing ?
                    <>
                        <IconButton
                            icon={TbCheck}
                            action={onUpdateSessionChat}
                            label='Confirm changes'
                            styles='chat_icons success'
                        />
                        <IconButton
                            icon={TbX}
                            action={() => setEditing(false)}
                            label='Cancel changes'
                            styles='chat_icons warning'
                        />
                    </>
                    :
                    <>
                        <IconButton
                            icon={TbEdit}
                            action={() => setEditing(true)}
                            label='Edit message'
                            styles='chat_icons'
                        />
                        <IconButton
                            icon={TbTrash}
                            action={onOpenModal}
                            label='Delete message'
                            styles='chat_icons warning'
                        />
                    </>
                }
                </>
                }
                {
                    !editing &&
                    <IconButton
                        icon={chatLiked ? TbHeartFilled : TbHeart }
                        action={chatLiked ? onRemoveSessionChatLike : onAddSessionChatLike}
                        label={`${chat.likes} likes`}
                        styles='accent'
                    />
                }
                </div>
        </motion.li>
        <Modal
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        >
            <DeleteSessionChatModal
                chat={chat}
                deleteChat={onDeleteSessionChat}
                close={onCloseModal}
            />
        </Modal>
        </>
    )
}

export default SessionChat
