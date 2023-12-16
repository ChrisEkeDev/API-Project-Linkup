import React from 'react'
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../shared/profileImage';
import Button from '../../shared/button';
import { format } from 'date-fns';

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
                    <p>{auth.name}</p>
                    <small>{formattedTime}</small>
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
                <Button
                    label="Cancel"
                    styles="small_button"
                    action={() => setCreating(false)}
                />
                <Button
                    label="Save"
                    styles="small_button"
                    action={createComment}
                />
            </div>
        </li>
    )
}

export default NewComment
