import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApp } from '../../App/Context/AppContext';
import { thunkCreateComment } from '../../Store/comments';

function useCreateComment() {
    const session = useSelector(state => state.sessions.singleSession);
    const player = useSelector(state => state.auth.player);
    const [ creating, setCreating] = useState(false);
    const [ text, setText ] = useState('');
    const dispatch = useDispatch();
    const ref3 = useRef();

    const handleCreating = () => {
        setCreating(!creating)
    }

    const handleInput = (e) => {
        setText(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (ref3.current && !ref3.current.contains(e.target)) {
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

     return { ref3, creating, setCreating, handleCreating, text, handleInput, createComment }

    }



export default useCreateComment
