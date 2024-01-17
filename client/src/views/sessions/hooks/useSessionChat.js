import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkUpdateSessionChat, thunkDeleteSessionChat } from "../../../store/chats";

function useSessionChat(props) {
    const {chat, socket, room} = props;
    const { dispatch } = useApp();
    const [content, setContent] = useState(chat.content);
    const [editing, setEditing] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setEditing(false)
        }
    }

    const handleInput = async (x) => {
        setContent(x.target.value)
    }

    const updateSessionChat = async () => {
        try {
            const response = await dispatch(thunkUpdateSessionChat(chat.id, content));
            socket.emit('update_message', room);
            setEditing(false)
            if (response.status >= 400) {
                throw new Error(response.error)
            }
        } catch(error) {
            console.log(error)
        }
    }

    const deleteSessionChat = async () => {
        try {
            const response = await dispatch(thunkDeleteSessionChat(chat.id));
            socket.emit('delete_message', room);
            setEditing(false)
            if (response.status >= 400) {
                throw new Error(response.error)
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { ref, content, handleInput, updateSessionChat, deleteSessionChat, editing, setEditing }
}

export default useSessionChat
