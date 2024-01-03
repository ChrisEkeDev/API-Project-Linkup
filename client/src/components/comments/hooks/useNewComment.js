import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useApp } from '../../../context/AppContext';
import { thunkCreateComment } from '../../../store/comments';

function useNewComment() {
    const { dispatch } = useApp();
    const session = useSelector(state => state.sessions.singleSession);
    const player = useSelector(state => state.auth.player);
    const [ creating, setCreating] = useState(false);
    const [ text, setText ] = useState('');
    const ref = useRef();

    const handleInput = (e) => {
        setText(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setCreating(false)
        }
    }

    const createComment = async (e) => {
        const newComment = {
            playerId: player.id,
            courtId: session.Court.id,
            sessionId: session.id,
            text,
            replyTo: null
        }
        try {
            const response = await dispatch(thunkCreateComment(newComment));
            if (response.status === 201) {
                setCreating(false)
            } else {
                throw new Error
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

     return { ref, creating, setCreating, text, handleInput, createComment }

    }



export default useNewComment
