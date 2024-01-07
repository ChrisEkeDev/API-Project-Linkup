import React from 'react'
import ProfileImage from '../../shared/profileImage';
import { AnimatePresence, motion } from 'framer-motion';
import { slide_variants, base_animations } from '../../../constants/animations';
import { PiArrowBendDownRightBold , PiCheckBold, PiXBold } from 'react-icons/pi';
import { format } from 'date-fns';
import { useApp } from '../../../context/AppContext';
import IconButton from '../../shared/button/IconButton';

function NewCommentReply(props) {
    const { auth } = useApp();
    const formattedTime = format(new Date(), "MMM do, yyyy - p")
    const {
        replying,
        setReplying,
        handleInput,
        createReply
    } = props;

    return (
        <AnimatePresence>
            {
                replying &&
                <motion.li variants={slide_variants} {...base_animations} className='comment'>
                    <PiArrowBendDownRightBold className='reply_icon' />
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
                        >
                        </textarea>
                    </div>
                    <div className='comment_actions'>
                        <IconButton
                            name="Save"
                            icon={PiCheckBold}
                            styles="small_button success"
                            action={createReply}
                        />
                        <IconButton
                            name="Cancel"
                            icon={PiXBold}
                            styles="small_button cancel"
                            action={() => setReplying(false)}
                        />
                    </div>
                </motion.li>
            }
        </AnimatePresence>

    )
}

export default NewCommentReply
