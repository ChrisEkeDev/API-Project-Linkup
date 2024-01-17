import React from 'react'
import { useState } from 'react';
import './styles.scss';
import IconButton from '../button/IconButton'
import { PiPaperPlaneRightFill  } from 'react-icons/pi'

function ChatInput({content, handleInput, create}) {
  return (
    <div className="chat_input">
        <div className="chat_contents">
            <textarea  value={content} onChange={handleInput} placeholder='New Message' type="text" />
            <IconButton
                styles='send_btn'
                icon={PiPaperPlaneRightFill}
                action={create}
            />
        </div>
    </div>
  )
}

export default ChatInput
