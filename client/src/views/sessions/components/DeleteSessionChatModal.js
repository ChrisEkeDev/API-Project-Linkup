import React from 'react'
import Button from '../../../components/shared/button'
import { TbTrash, TbX } from 'react-icons/tb';
import { format , parseISO, isSameDay } from 'date-fns'
import ProfileImage from '../../../components/shared/profileImage'

function DeleteSessionChatModal({chat, deleteChat, close}) {
    const today = new Date();
    const createdToday = isSameDay(parseISO(chat.createdAt), today);
    const chatDateFormat = createdToday ? 'p' : 'MM/dd  •  p';
    const formatDate = format(parseISO(chat.createdAt), chatDateFormat);

    return (
        <div className='modal_container'>
            <header className='modal_header'>
                <h2 className='md modal_title'>
                    Are you sure you want to delete this message?
                </h2>
                <p className="sm modal_sub-title">
                    This cant be undone..
                </p>
            </header>
            <section className='modal_content'>
                <div className="chat_item">
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
                            className="chat_textarea"
                            disabled={true}
                            defaultValue={chat.content}
                        >
                        </textarea>
                    </div>
                </div>
            </section>
            <footer className='modal_actions'>
                <Button
                    label="Keep Message"
                    styles="tertiary"
                    icon={TbX}
                    action={close}
                />
                <Button
                    label="Delete Message"
                    styles="warning"
                    icon={TbTrash}
                    action={deleteChat}
                />
            </footer>
        </div>
    )
}

export default DeleteSessionChatModal
