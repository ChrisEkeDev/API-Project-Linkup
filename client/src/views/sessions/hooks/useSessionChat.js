import { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { addLike, removeLike } from '../../../store/auth';
import { createSessionChat, updateSessionChat, deleteSessionChat } from '../../../store/sessions';


function useSessionChat(props) {
    const ref = useRef(null);
    const client = useQueryClient();
    const { handleAlerts } = useApp();
    const { id } = useParams();
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
        client.invalidateQueries(['session-feed'])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleCreateSessionChat
    } = useMutation({
        mutationFn: createSessionChat,
        onSuccess: handleSuccess,
        onError: handleError
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

    const {
        mutate: handleUpdateSessionChat
    } = useMutation({
        mutationFn: updateSessionChat,
        onSuccess: handleSuccess,
        onError: handleError
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

    const {
        mutate: handleDeleteSessionChat
    } = useMutation({
        mutationFn: deleteSessionChat,
        onSuccess: handleSuccess,
        onError: handleError
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

    const handleLikeSuccess = () => {
        client.invalidateQueries(['session-feed'])
        client.invalidateQueries(['my-likes'])
    }

    const handleLikeError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleAddSessionChatLike
    } = useMutation({
        mutationFn: addLike,
        onSuccess: handleLikeSuccess,
        onError: handleLikeError
    })

    const onAddSessionChatLike = async () => {
        try {
            const data = { entityId: chat.id, entityType: 'session-chat'}
            handleAddSessionChatLike(data)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleRemoveSessionChatLike
    } = useMutation({
        mutationFn: removeLike,
        onSuccess: handleLikeSuccess,
        onError: handleLikeError
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
