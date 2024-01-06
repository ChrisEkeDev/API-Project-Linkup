import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { base_animations, child_variants, comment_variants } from '../../../constants/animations';
import { parseISO, format } from 'date-fns';
import { useApp } from '../../../context/AppContext';
import { PiArrowBendDownRightBold , PiCheckBold, PiPencilLineBold, PiChatCircleTextBold, PiTrashBold, PiXBold } from 'react-icons/pi';
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
  <motion.li variants={child_variants}
    ref={ref}
    className='comment'
    onMouseEnter={() => setShowActions(true)}
    onMouseLeave={() => setShowActions(false)}
  >
    { isReply && <PiArrowBendDownRightBold className='reply_icon' /> }
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
          icon={PiChatCircleTextBold}
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
            icon={PiCheckBold}
            styles="small_button success"
            action={updateComment}
          />
          <IconButton
            name="Cancel"
            icon={PiXBold}
            styles="small_button cancel"
            action={() => setUpdating(false)}
          />
        </> :
        isCreator && !updating ?
        <>
          <IconButton
            name="Edit"
            icon={PiPencilLineBold}
            styles="small_button reply"
            action={() => setUpdating(true)}
          />
          <IconButton
            name="Delete"
            icon={PiTrashBold}
            styles="small_button warning"
            action={onOpenModal}
          />
        </> :
        null
      }
    </div> :
    null
  }
  </motion.li>

  <motion.div variants={comment_variants} {...base_animations} ref={replyRef}>
    <NewCommentReply {...{
        replying,
        setReplying,
        handleInput,
        createReply
      }}
    />
  </motion.div>
    <Modal
      isModalOpen={isModalOpen}
      onCloseModal={onCloseModal}
    >
      <div className='modal_container'>
        <h2 className='md modal_title'>Are you sure you want to delete this comment?</h2>
        <div className='comment deleting_comment'>
        { isReply && <PiArrowBendDownRightBold className='reply_icon' /> }
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
            styles="tertiary"
            icon={PiXBold}
            action={onCloseModal}
          />
          <Button
            label="Delete Comment"
            styles="warning"
            icon={PiTrashBold}
            action={() => deleteComment(comment, onCloseModal)}
          />
        </div>
      </div>
    </Modal>
    </>
  )
}

export default Comment
