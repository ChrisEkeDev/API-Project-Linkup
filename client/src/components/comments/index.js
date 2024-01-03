import React, { useState} from 'react'
import { motion } from 'framer-motion'
import useComments from './hooks/useComments';
import useNewComment from './hooks/useNewComment';
import Comment from './components/Comment';
import Button from '../../components/shared/button';
import './styles.scss';
import NewComment from './components/NewComment';
import { TbMessage2Question, TbMessagePlus } from 'react-icons/tb';
import { parent_variants, comment_variants, base_animations } from '../../constants/animations';

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
            <motion.ul
                variants={parent_variants}
                {...base_animations}
                className='comments_list'>
                    <motion.div variants={comment_variants} {...base_animations} ref={ref}>
                        <NewComment {...{
                            creating,
                            setCreating,
                            handleInput,
                            createComment
                        }}/>
                    </motion.div>
                    {
                        comments.length === 0 ?
                        creating ?
                        null :
                        <motion.div className='no_comments'>
                            <TbMessage2Question className='icon'/>
                            <span className='xs bold'>No Comments Yet</span>
                        </motion.div> :
                        comments.map(comment => (
                            <Comment comment={comment}/>
                        ))
                    }
            </motion.ul>
        </div>
    )
}

export default Comments
