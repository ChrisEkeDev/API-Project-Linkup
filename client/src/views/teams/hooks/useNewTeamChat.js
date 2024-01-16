import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useApp} from '../../../context/AppContext'
import { thunkCreateTeamChat, thunkGetTeamFeed } from '../../../store/chats'

function useNewTeamChat({socket, room}) {
  const team = useSelector(state => state.teams.singleTeam)
  const { dispatch } = useApp()
  const [ content, setContent ] = useState('')

  const handleInput = (x) => {
    setContent(x.target.value)
  }

  const createTeamChat = async () => {
    try {
      const res = await dispatch(thunkCreateTeamChat(team.id, content));
      socket.emit('new_message', room)
    } catch (e) {
        console.error(e)
    } finally {
      setContent("")
    }
  }

  return { handleInput, content, createTeamChat }
}

export default useNewTeamChat
