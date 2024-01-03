import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../shared/profileImage';
import Button from '../../shared/button';
import { format } from 'date-fns';
import IconButton from '../../shared/button/IconButton';
import { TbCheck, TbX } from 'react-icons/tb';
import { comment_variants, base_animations } from '../../../constants/animations';

function NewComment(props) {
    const { auth } = useApp();
    const formattedTime = format(new Date(), "MMM do, yyyy - p")

    const  {
        setCreating,
        creating,
        handleInput,
        createComment
    } = props;

    return (
        <AnimatePresence>
            {
                creating &&
                <motion.li variants={comment_variants} {...base_animations} className='comment new-comment'>
                    <ProfileImage
                        player={auth}
                        size={4}
                    />
                    <div className='comment_contents'>
                        <div className='comment_creator details'>
                            <p className="sm bold">{auth.name}</p>
                            <small className='xs'>{formattedTime}</small>
                        </div>
                        <textarea
                            className='comment_text'
                            onChange={handleInput}
                            defaultValue={''}
                            disabled={false}
                        >
                        </textarea>
                    </div>
                    <div className='comment_actions'>
                        <IconButton
                            name="Save"
                            icon={TbCheck}
                            styles="small_button success"
                            action={createComment}
                        />
                        <IconButton
                            name="Cancel"
                            icon={TbX}
                            styles="small_button cancel"
                            action={() => setCreating(false)}
                        />
                    </div>
                </motion.li>
            }
        </AnimatePresence>
    )
}

export default NewComment
