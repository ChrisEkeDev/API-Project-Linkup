import React, { useState} from 'react'
import useComments from './hooks/useComments';
import useNewComment from './hooks/useNewComment';
import Comment from './components/Comment';
import Button from '../../components/shared/button';
import './styles.scss';
import NewComment from './components/NewComment';

function Comments() {
    const { comments  } = useComments();
    const  {
        ref,
        setCreating,
        creating,
        handleInput,
        createComment
    } = useNewComment();

    return (
        <div className='session_comments'>
            <header className='sub_header'>
                    <h2>Comments ({comments.length})</h2>
                    <Button
                        styles=""
                        label="New Comment"
                        action={creating ? () => setCreating(false) : () => setCreating(true)}
                        disabled={creating}
                    />
            </header>
            <ul className='comments_list'>
                <div ref={ref}>
                    <NewComment {...{
                        creating,
                        setCreating,
                        handleInput,
                        createComment
                    }}/>
                </div>
                {
                    comments.length === 0 ?
                    creating ?
                    null :
                    <div className='no_comments'>
                        <p>No Comments Yet</p>
                    </div> :
                    comments.map(comment => (
                        <Comment comment={comment}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default Comments
