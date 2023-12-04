import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '../../App/Context/AppContext';
import { thunkCreateComment } from '../../Store/comments';

function useCreateReply(replyTo) {
    const session = useSelector(state => state.sessions.singleSession);
    const player = useSelector(state => state.auth.player);
    const [ replying, setReplying] = useState(false);
    const [ text, setText ] = useState('');
    const dispatch = useDispatch();
    const ref2 = useRef();

    const handleReplying = () => {
        setReplying(!replying)
    }

    const handleInput = (e) => {
        setText(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (ref2.current && !ref2.current.contains(e.target)) {
            setReplying(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
     }, [])

    const createComment = async (e) => {
        const newComment = {
            playerId: player.id,
            courtId: session.Court.id,
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


    return { ref2, replying, setReplying, handleReplying, text, handleInput, createComment }
}

export default useCreateReply
