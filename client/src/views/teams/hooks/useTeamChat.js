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


    const handleSuccess = () => {
        client.invalidateQueries(['team-feed'])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleCreateTeamChat
    } = useMutation({
        mutationFn: createTeamChat,
        onSuccess: handleSuccess,
        onError: handleError
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


    const {
        mutate: handleUpdateTeamChat
    } = useMutation({
        mutationFn: updateTeamChat,
        onSuccess: handleSuccess,
        onError: handleError
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

    const {
        mutate: handleDeleteTeamChat
    } = useMutation({
        mutationFn: deleteTeamChat,
        onSuccess: handleSuccess,
        onError: handleError
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

    const handleLikeSuccess = () => {
        client.invalidateQueries(['team-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleLikeError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleAddTeamChatLike
    } = useMutation({
        mutationFn: addLike,
        onSuccess: handleLikeSuccess,
        onError: handleLikeError
    })

    const onAddTeamChatLike = async () => {
        try {
            const data = { entityId: chat.id, entityType: 'team-chat'}
            handleAddTeamChatLike(data)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleRemoveTeamChatLike
    } = useMutation({
        mutationFn: removeLike,
        onSuccess: handleLikeSuccess,
        onError: handleLikeError
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
