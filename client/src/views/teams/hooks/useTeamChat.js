import React, { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { addLike, removeLike } from '../../../store/auth';
import { createTeamChat, updateTeamChat, deleteTeamChat } from '../../../store/teams';


function useTeamChat(props) {
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


    const handleCreateTeamChatSuccess = () => {
        client.invalidateQueries(['team-feed'])
    }

    const handleCreateTeamChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleCreateTeamChat,
        isLoading: createTeamChatLoading
    } = useMutation({
        mutationFn: createTeamChat,
        onError: handleCreateTeamChatError,
        onSuccess: handleCreateTeamChatSuccess,

    })

    const onCreateTeamChat = async () => {
        try {
            const data = { teamId: id, content }
            handleCreateTeamChat(data)
            socket.emit('new_message', room);
            setContent("")
        } catch(e) {
            console.error(e)
        }
    }

    const handleUpdateTeamChatSuccess = () => {
        client.invalidateQueries(['team-feed'])
    }

    const handleUpdateTeamChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleUpdateTeamChat,
        isLoading: updateTeamChatLoading
    } = useMutation({
        mutationFn: updateTeamChat,
        onError: handleUpdateTeamChatError,
        onSuccess: handleUpdateTeamChatSuccess,

    })

    const onUpdateTeamChat = async () => {
        try {
            const data = {chatId: chat.id, content }
            handleUpdateTeamChat(data);
            socket.emit('update_message', room);
            setEditing(false)
        } catch(e) {
            console.error(e)
        }
    }

    const handleDeleteTeamChatSuccess = () => {
        client.invalidateQueries(['team-feed'])
    }

    const handleDeleteTeamChatError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleDeleteTeamChat,
        isLoading: deleteTeamChatLoading
    } = useMutation({
        mutationFn: deleteTeamChat,
        onError: handleDeleteTeamChatError,
        onSuccess: handleDeleteTeamChatSuccess,

    })

    const onDeleteTeamChat = async () => {
        try {
            handleDeleteTeamChat(chat.id)
            socket.emit('delete_message', room);
            setEditing(false)
        } catch(e) {
            console.error(e)
        }
    }

    const handleAddTeamChatLikeSuccess = () => {
        client.invalidateQueries(['team-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleAddTeamChatLikeError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleAddTeamChatLike
    } = useMutation({
        mutationFn: addLike,
        onError: handleAddTeamChatLikeError,
        onSuccess: handleAddTeamChatLikeSuccess,

    })

    const onAddTeamChatLike = async () => {
        try {
            const data = { entityId: chat.id, entityType: 'team-chat'}
            handleAddTeamChatLike(data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleRemoveTeamChatLikeSuccess = () => {
        client.invalidateQueries(['team-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleRemoveTeamChatLikeError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleRemoveTeamChatLike
    } = useMutation({
        mutationFn: removeLike,
        onError: handleRemoveTeamChatLikeError,
        onSuccess: handleRemoveTeamChatLikeSuccess,

    })

    const onRemoveTeamChatLike = async () => {
        try {
            const data = { entityId: chat.id }
            handleRemoveTeamChatLike(data)
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
        onUpdateTeamChat,
        onCreateTeamChat,
        onDeleteTeamChat,
        onAddTeamChatLike,
        onRemoveTeamChatLike
    }

}

export default useTeamChat
