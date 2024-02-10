import React, { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { addLike, removeLike } from '../../../store/auth';
import { createSessionChat, updateSessionChat, deleteSessionChat } from '../../../store/sessions';


function useSessionChat(props) {
    const ref = useRef(null);
    const client = useQueryClient();
    const { id } = useParams();
    const { handleAlerts } = useApp();
    const { chat, socket, room } = props;
    const [ content, setContent ] = useState(chat?.content || '');
    const [ editing, setEditing ] = useState(false);

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setEditing(false)
        }
    }

    const handleInput = async (x) => {
        setContent(x.target.value)
    }


    const handleCreateSessionChatSuccess = () => {
        client.invalidateQueries(['session-feed'])
    }

    const handleCreateSessionChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleCreateSessionChat,
        isLoading: createSessionChatLoading
    } = useMutation({
        mutationFn: createSessionChat,
        onError: handleCreateSessionChatError,
        onSuccess: handleCreateSessionChatSuccess,

    })

    const onCreateSessionChat = async () => {
        try {
            const data = { sessionId: id, content }
            handleCreateSessionChat(data)
            socket.emit('new_message', room);
            setContent("")
        } catch(e) {
            console.error(e)
        }
    }

    const handleUpdateSessionChatSuccess = () => {
        client.invalidateQueries(['session-feed'])
    }

    const handleUpdateSessionChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleUpdateSessionChat,
        isLoading: updateSessionChatLoading
    } = useMutation({
        mutationFn: updateSessionChat,
        onError: handleUpdateSessionChatError,
        onSuccess: handleUpdateSessionChatSuccess,

    })

    const onUpdateSessionChat = async () => {
        try {
            const data = {chatId: chat.id, content }
            handleUpdateSessionChat(data);
            socket.emit('update_message', room);
            setEditing(false)
        } catch(e) {
            console.error(e)
        }
    }

    const handleDeleteSessionChatSuccess = () => {
        client.invalidateQueries(['session-feed'])
    }

    const handleDeleteSessionChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleDeleteSessionChat,
        isLoading: deleteSessionChatLoading
    } = useMutation({
        mutationFn: deleteSessionChat,
        onError: handleDeleteSessionChatError,
        onSuccess: handleDeleteSessionChatSuccess,

    })

    const onDeleteSessionChat = async () => {
        try {
            handleDeleteSessionChat(chat.id)
            socket.emit('delete_message', room);
            setEditing(false)
        } catch(e) {
            console.error(e)
        }
    }

    const handleAddSessionChatLikeSuccess = () => {
        client.invalidateQueries(['session-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleAddSessionChatLikeError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleAddSessionChatLike
    } = useMutation({
        mutationFn: addLike,
        onError: handleAddSessionChatLikeError,
        onSuccess: handleAddSessionChatLikeSuccess,

    })

    const onAddSessionChatLike = async () => {
        try {
            const data = { entityId: chat.id, entityType: 'session-chat'}
            handleAddSessionChatLike(data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleRemoveSessionChatLikeSuccess = () => {
        client.invalidateQueries(['session-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleRemoveSessionChatLikeError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleRemoveSessionChatLike
    } = useMutation({
        mutationFn: removeLike,
        onError: handleRemoveSessionChatLikeError,
        onSuccess: handleRemoveSessionChatLikeSuccess,

    })

    const onRemoveSessionChatLike = async () => {
        try {
            const data = { entityId: chat.id }
            handleRemoveSessionChatLike(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return {
        ref,
        content,
        handleInput,
        editing,
        setEditing,
        onUpdateSessionChat,
        onCreateSessionChat,
        onDeleteSessionChat,
        onAddSessionChatLike,
        onRemoveSessionChatLike
    }

}

export default useSessionChat
