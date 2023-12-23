import React from 'react'
import ProfileImage from '../../shared/profileImage';
import Button from '../../shared/button';
import { format } from 'date-fns';
import { TbArrowForward, TbCheck, TbX } from 'react-icons/tb';
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

    if(!replying) return null

    return (
        <li className='comment'>
            <TbArrowForward className='reply_icon' />
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
                    icon={TbCheck}
                    styles="small_button success"
                    action={createReply}
                />
                <IconButton
                    name="Cancel"
                    icon={TbX}
                    styles="small_button cancel"
                    action={() => setReplying(false)}
                />
            </div>
        </li>
    )
}

export default NewCommentReply
