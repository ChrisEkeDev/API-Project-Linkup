import React from 'react'
import ProfileImage from '../../shared/profileImage';
import Button from '../../shared/button';
import { format } from 'date-fns';
import { TbArrowForward } from 'react-icons/tb';
import { useApp } from '../../../context/AppContext';

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
                    <p>{auth.name}</p>
                    <small>{formattedTime}</small>
                </div>
                <textarea
                    className='comment_text'
                    onChange={handleInput}
                    defaultValue={''}
                >
                </textarea>
            </div>
            <div className='comment_actions'>
                <Button
                    label="Cancel"
                    styles="small_button"
                    action={() => setReplying(false)}
                />
                <Button
                    label="Save"
                    styles="small_button"
                    action={createReply}
                />
            </div>
        </li>
    )
}

export default NewCommentReply
