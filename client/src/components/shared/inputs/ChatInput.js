import React from 'react'
import { useState } from 'react';
import './styles.scss';
import IconButton from '../button/IconButton'
import { TbSend  } from 'react-icons/tb'

function ChatInput({content, handleInput, create}) {
  return (
    <div className="chat_input">
        <div className="chat_contents">
            <textarea  value={content} onChange={handleInput} placeholder='New Message' type="text" />
            <IconButton
                styles='send_btn deg45'
                icon={TbSend}
                action={create}
            />
        </div>
    </div>
  )
}

export default ChatInput
