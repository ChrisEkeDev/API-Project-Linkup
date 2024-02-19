import React from 'react'
import Button from '../../../components/shared/button'
import { TbX, TbTrash } from 'react-icons/tb'

function DeleteTeamChatModal({chat, deleteChat, close}) {
  return (
    <div className='modal_container'>
            <h2 className='md modal_title'>
                Are you sure you want to delete this message?
            </h2>
            <p className="sm modal_body">
                This cant be undone..
            </p>

            <div className='modal_actions'>
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
            </div>
        </div>
  )
}

export default DeleteTeamChatModal
