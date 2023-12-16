import { useEffect, useState, useRef } from "react";
import { useApp } from "../../../context/AppContext";
import { useSelector } from 'react-redux';
import { thunkDeleteComment, thunkUpdateComment } from "../../../store/comments";

const useComment = (comment) => {
    const { auth, dispatch } = useApp();
    const session = useSelector(state => state.sessions.singleSession);
    const [ value, setValue ] = useState(comment.text);
    const [ updating, setUpdating ] = useState(false);
    const ref = useRef(null);

    const onValueChange = (e) => {
        setValue(e.target.value);
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setUpdating(false)
        }
    }

    const updateComment = async () => {
        try {
            const response = await dispatch(thunkUpdateComment({value}, comment?.id ));
            if (response.status === 200) {
                setUpdating(false)
            } else {
                throw new Error()
            }
        } catch(error) {
            console.log(error)
        }
    }

    const deleteComment = async (comment, cb) => {
        try {
            const response = await dispatch(thunkDeleteComment(comment.id))
            if ( response.status === 200) {
                cb(false)
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



    return {
        ref,
        setValue,
        updating,
        setUpdating,
        onValueChange,
        updateComment,
        deleteComment
    }
}

export default useComment;
