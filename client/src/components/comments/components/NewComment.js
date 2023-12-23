import React from 'react'
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../shared/profileImage';
import Button from '../../shared/button';
import { format } from 'date-fns';
import IconButton from '../../shared/button/IconButton';
import { TbCheck, TbX } from 'react-icons/tb';

function NewComment(props) {
    const { auth } = useApp();
    const formattedTime = format(new Date(), "MMM do, yyyy - p")

    const  {
        setCreating,
        creating,
        handleInput,
        createComment
    } = props;

    if (!creating) return null

    return (
        <li className='comment new-comment'>
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
        </li>
    )
}

export default NewComment
