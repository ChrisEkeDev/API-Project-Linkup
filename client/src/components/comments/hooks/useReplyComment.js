import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '../../../context/AppContext';
import { thunkCreateComment } from '../../../store/comments';

function useReplyComment(replyTo) {
    const session = useSelector(state => state.sessions.singleSession);
    const player = useSelector(state => state.auth.player);
    const [ replying, setReplying] = useState(false);
    const [ text, setText ] = useState('');
    const dispatch = useDispatch();
    const replyRef = useRef();

    const handleInput = (e) => {
        setText(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (replyRef.current && !replyRef.current.contains(e.target)) {
            setReplying(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
     }, [])

    const createReply = async (e) => {
        const newComment = {
            playerId: player.id,
            courtId: session.courtId,
            sessionId: session.id,
            text,
            replyTo
        }
        try {
            const response = await dispatch(thunkCreateComment(newComment));
            if (response.status === 201) {
                setReplying(false)
            } else {
                throw new Error
            }
        } catch(error) {
            console.log(error)
        }
    }


    return { replyRef, replying, setReplying, text, handleInput, createReply }
}

export default useReplyComment
