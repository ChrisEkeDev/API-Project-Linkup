import React from 'react'
import Button from '../../Shared/components/Button'
import { useSelector } from 'react-redux'
import {TbArrowBack, TbCheck, TbEdit, TbTrash, TbX } from 'react-icons/tb'

function CommentControls(props) {
    const {comment, handleEdit, creating, handleCreating, editing, replying, handleReplying, createComment, updateComment, setDeleting } = props;
    const player = useSelector(state => state.auth.player);
    const isReply = comment?.replyTo !== null;
    const isAuthorized = player?.id == comment?.playerId;

    if (!player) return null

    return (
        <div className='comments__controls'>
            {
                isAuthorized ?
                <>
                    {
                        editing ?
                        <>
                            <Button
                                styles='icon__button'
                                icon={TbX}
                                action={handleEdit}
                            />
                            <Button
                                styles='icon__button'
                                icon={TbCheck}
                                action={updateComment}
                            />
                        </> :
                        replying ?
                        <>
                            <Button
                                styles='icon__button'
                                icon={TbX}
                                action={handleReplying}
                            />
                            <Button
                                styles='icon__button'
                                icon={TbCheck}
                                action={createComment}
                            />
                        </> :
                        <>
                            <Button
                                styles='icon__button'
                                icon={TbEdit}
                                action={handleEdit}
                            />
                            <Button
                                styles='icon__button'
                                icon={TbTrash}
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
                                styles='icon__button'
                                icon={TbX}
                                action={handleReplying}
                            />
                            <Button
                                styles='icon__button'
                                icon={TbCheck}
                                action={createComment}
                            />
                        </> :
                        creating ?
                        <>
                            <Button
                                styles='icon__button'
                                icon={TbX}
                                action={handleCreating}
                            />
                            <Button
                                styles='icon__button'
                                icon={TbCheck}
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
                    styles="icon__button"
                    action={handleReplying}
                    icon={TbArrowBack}
                />
            }
        </div>
    )
}

export default CommentControls
