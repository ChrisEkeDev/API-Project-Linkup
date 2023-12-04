import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkDeleteComment } from '../../Store/comments';

function useDeleteComment() {
    const [deleting, setDeleting] = useState(false);
    const dispatch = useDispatch();

    const deleteComment = async (comment) => {
        console.log(comment)
        try {
            const response = await dispatch(thunkDeleteComment(comment.id))
            if ( response.status === 200) {
                setDeleting(false)
            } else {
                throw new Error
            }
        } catch(error) {
            console.log(error)
        }
    }

    return { deleting, setDeleting, deleteComment }
}

export default useDeleteComment
