import React, { useState } from 'react'
import { thunkCreateSessionChat, thunkGetSessionFeed } from '../../../store/chats'

function useNewSessionChat({session, socket, room}) {
  const [ content, setContent ] = useState('')

  const handleInput = (x) => {
    setContent(x.target.value)
  }

  const createSessionChat = async () => {
    // try {
    //   const res = await dispatch(thunkCreateSessionChat(session.id, content));
    //   console.log(socket)
    //   socket.emit('new_message', room)
    // } catch (e) {
    //     console.error(e)
    // } finally {
    //   setContent("")
    // }
  }

  return { handleInput, content, createSessionChat }
}

export default useNewSessionChat
