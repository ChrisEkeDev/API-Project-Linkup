import { useEffect, useState, useRef } from "react";
import { useApp } from "../../../context/AppContext";
import { useSelector } from 'react-redux';
import { thunkCreateComment, thunkUpdateComment } from "../../../store/comments";

const useComment = (comment) => {
    const { auth, dispatch } = useApp();
    const session = useSelector(state => state.sessions.singleSession);
    const [ value, setValue ] = useState(comment.text);
    const [ mode, setMode ] = useState(null);
    const ref = useRef(null);

    const onValueChange = (e) => {
        setValue(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setMode(null)
        }
    }

    const createComment = async (replyTo) => {
        const newComment = {
            playerId: auth.id,
            courtId: session.Court.id,
            sessionId: session.id,
            text: value,
            replyTo: replyTo ? replyTo : null
        }
        try {
            const response = await dispatch(thunkCreateComment(newComment));
            if (response.status === 201) {
                setMode(null)
            } else {
                throw new Error()
            }
        } catch(error) {
            console.log(error)
        }
    }

    const updateComment = async () => {
        try {
            const response = await dispatch(thunkUpdateComment({value}, comment?.id ));
            if (response.status === 200) {
                setMode(null)
            } else {
                throw new Error()
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



    return {
        ref,
        setValue,
        mode,
        setMode,
        onValueChange,
        createComment,
        updateComment
    }
}

export default useComment;
