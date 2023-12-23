import React, { useState} from 'react'
import useComments from './hooks/useComments';
import useNewComment from './hooks/useNewComment';
import Comment from './components/Comment';
import Button from '../../components/shared/button';
import './styles.scss';
import NewComment from './components/NewComment';
import { TbMessage2Question, TbMessagePlus } from 'react-icons/tb';

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
            <h2 className='section_label xs bold'>{comments.length} Comments</h2>
            <header className='sub_header'>
                    <div></div>
                    <Button
                        styles="secondary new_comment_btn"
                        icon={TbMessagePlus}
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
                        <TbMessage2Question className='icon'/>
                        <span className='xs bold'>No Comments Yet</span>
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
