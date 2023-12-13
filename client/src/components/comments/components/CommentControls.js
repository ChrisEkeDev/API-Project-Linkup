import React from 'react'
import Button from '../../../components/shared/button'
import { useSelector } from 'react-redux'
import {TbMessagePlus, TbCheck, TbEdit, TbTrash, TbX } from 'react-icons/tb'

function CommentControls(props) {
    const {visible, comment, handleEdit, creating, handleCreating, editing, replying, handleReplying, createComment, updateComment, setDeleting } = props;
    const player = useSelector(state => state.auth.player);
    const isReply = comment?.replyTo !== null;
    const isAuthorized = player?.id == comment?.playerId;

    if (!player || !visible ) return null

    return (
        <div className='comments__controls'>
            {
                isAuthorized ?
                <>
                    {
                        editing ?
                        <>
                            <Button
                                styles='icon__button toggle-update-button'
                                icon={TbX}
                                label="Cancel"
                                action={handleEdit}
                            />
                            <Button
                                styles='icon__button confirm-update-button'
                                icon={TbCheck}
                                label="Update"
                                action={updateComment}
                            />
                        </> :
                        replying ?
                        <>
                            <Button
                                styles='icon__button toggle-reply-button'
                                icon={TbX}
                                label="Cancel"
                                action={handleReplying}
                            />
                            <Button
                                styles='icon__button confirm-reply-button'
                                icon={TbCheck}
                                label="Reply"
                                action={createComment}
                            />
                        </> :
                        <>
                            <Button
                                styles='icon__button toggle-update-button'
                                icon={TbEdit}
                                label="Edit"
                                action={handleEdit}
                            />
                            <Button
                                styles='icon__button toggle-delete-button'
                                icon={TbTrash}
                                label="Delete"
                                action={() => setDeleting(true)}
                            />
                        </>
                    }
                </> :
                <>
                    {
                        replying ?
                        <>
                            <Button
                                styles='icon__button toggle-reply-button'
                                icon={TbX}
                                label="Cancel"
                                action={handleReplying}
                            />
                            <Button
                                styles='icon__button confirm-reply-button'
                                icon={TbCheck}
                                label="Reply"
                                action={createComment}
                            />
                        </> :
                        creating ?
                        <>
                            <Button
                                styles='icon__button toggle-new-button'
                                icon={TbX}
                                label="Cancel"
                                action={handleCreating}
                            />
                            <Button
                                styles='icon__button confirm-new-button'
                                icon={TbCheck}
                                label="Create"
                                action={createComment}
                            />
                        </> :
                        null
                    }
                </>
            }
            {
                !isReply && !replying &&
                <Button
                    styles="icon__button toggle-reply-button"
                    action={handleReplying}
                    label="Reply"
                    icon={TbMessagePlus}
                />
            }
        </div>
    )
}

export default CommentControls
