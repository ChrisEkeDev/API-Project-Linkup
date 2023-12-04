import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { thunkUpdateComment } from '../../Store/comments';

function useEditComment(data) {
    const [text, setText] = useState(data?.text || undefined);
    const [editing, setEditing] = useState(false);
    const ref1 = useRef();
    const dispatch = useDispatch();

    const handleCommentInput = (e) => {
        setText(e.target.value)
    }

    const handleClickOutside = (e) => {
        if (ref1.current && !ref1.current.contains(e.target)) {
            setEditing(false)
        }
    }

    const updateComment = async () => {
        try {
            const response = await dispatch(thunkUpdateComment({text}, data?.id ));
            console.log({text}, data?.id)
            if (response.status === 200) {
                setEditing(false)
            } else {
                throw new Error
            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleEdit = () => setEditing(!editing);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
     }, [])

    return { ref1, text, editing, setText, handleEdit, handleCommentInput, updateComment }
}

export default useEditComment
