import React, { useState } from 'react'
import { parseISO, format } from 'date-fns';
import { useApp } from '../../../context/AppContext';
import { TbArrowForward, TbCheck, TbEdit, TbMessagePlus, TbTrashFilled, TbX } from 'react-icons/tb';
import useComment from '../hooks/useComment';
import Button from '../../shared/button';
import ProfileImage from '../../shared/profileImage';
import useReplyComment from '../hooks/useReplyComment';
import NewCommentReply from './NewCommentReply';
import Modal from '../../shared/modal';
import useModal from '../../../hooks/useModal'
import IconButton from '../../shared/button/IconButton';

function Comment({ comment }) {
  const { auth } = useApp();
  const { isModalOpen, onOpenModal, onCloseModal } = useModal();
  const [ showActions, setShowActions ] = useState(false)
  const isCreator = auth.id === comment.playerId;
  const {
    ref,
    setValue,
    updating,
    setUpdating,
    onValueChange,
    updateComment,
    deleteComment,
  } = useComment(comment);

  const {
    replyRef,
    replying,
    setReplying,
    handleInput,
    createReply
} = useReplyComment(comment.id);

  if (!comment) return <div>loading...</div>

  const isReply = comment?.replyTo !== null;
  const parsedDate = parseISO(comment.updatedAt);
  const formattedTime = format(parsedDate, "MMM do, yyyy - p")

  return (
  <>
  <li
    ref={ref}
    className='comment'
    onMouseEnter={() => setShowActions(true)}
    onMouseLeave={() => setShowActions(false)}
  >
    { isReply && <TbArrowForward className='reply_icon' /> }
    <ProfileImage
      player={comment?.Player}
      size={4}
    />
    <div className='comment_contents'>
      <div className='comment_creator details'>
        <p className='sm bold'>{comment.Player.name}</p>
        <span>&#8226;</span>
        <small className='xs'>{formattedTime}</small>
      </div>
      <textarea
        className='comment_text'
        onChange={onValueChange}
        defaultValue={comment.text || ''}
        disabled={!updating}
      >
      </textarea>
  </div>
  { showActions || updating ?
    <div className='comment_actions'>
      {
        !isReply && !isCreator ?
        <IconButton
          name="Reply"
          icon={TbMessagePlus}
          styles="small_button reply"
          action={() => setReplying(true)}
          /> :
          null
      }
      {
        isCreator && updating ?
        <>
          <IconButton
            name="Save"
            icon={TbCheck}
            styles="small_button success"
            action={updateComment}
          />
          <IconButton
            name="Cancel"
            icon={TbX}
            styles="small_button cancel"
            action={() => setUpdating(false)}
          />
        </> :
        isCreator && !updating ?
        <>
          <IconButton
            name="Edit"
            icon={TbEdit}
            styles="small_button reply"
            action={() => setUpdating(true)}
          />
          <IconButton
            name="Delete"
            icon={TbTrashFilled}
            styles="small_button warning"
            action={onOpenModal}
          />
        </> :
        null
      }
    </div> :
    null
  }
  </li>

  <div ref={replyRef}>
    <NewCommentReply {...{
        replying,
        setReplying,
        handleInput,
        createReply
      }}
    />
  </div>
    <Modal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
    >
        <h2>Are you sure you want to delete this comment?</h2>
        <div className='comment deleting_comment'>
        { isReply && <TbArrowForward className='reply_icon' /> }
          <ProfileImage
            player={comment?.Player}
            size={4}
          />
          <div className='comment_contents'>
            <div className='comment_creator'>
              <p className='sm bold'>{comment.Player.name}</p>
              <small className='xs'>{formattedTime}</small>
            </div>
            <textarea
              className='comment_text'
              onChange={null}
              defaultValue={comment.text}
              disabled={true}
            >
            </textarea>
        </div>
        </div>
        <div className='modal_actions'>
          <Button
            label="Keep Comment"
            styles=""
            action={onCloseModal}
          />
          <Button
            label="Delete Comment"
            styles=""
            action={() => deleteComment(comment, onCloseModal)}
          />
        </div>
    </Modal>
    </>
  )
}

export default Comment
