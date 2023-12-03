import React, { useState, useEffect, useRef } from 'react'

function CommentInput({comment, handleCommentInput}) {
    const ref = useRef(null);
    const [ height, setHeight ] = useState('auto')

    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current?.scrollHeight)
        }
    }, [ref.current, comment?.text])

    return (
        <textarea
            ref={ref}
            name="text"
            style={{ height: `${height}px` }}
            className='comment__input' defaultValue={comment?.text || ''}
            onChange={handleCommentInput}
        >
        </textarea>
    )
}

export default CommentInput
