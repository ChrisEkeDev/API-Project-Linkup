import React from 'react'
import { useApp } from '../../../context/AppContext';
import './styles.scss';
import IconButton from '../button/IconButton'
import { TbSend  } from 'react-icons/tb'

function ChatInput({content, handleInput, create}) {
  const { theme } = useApp();

  return (
    <div className={`chat_input chat_input-${theme}`}>
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
