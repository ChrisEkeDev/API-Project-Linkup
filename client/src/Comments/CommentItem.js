import React, { useState } from 'react'
import { parse, parseISO, format } from 'date-fns';
import CommentControls from './CommentControls';
import { TbArrowForward } from 'react-icons/tb';
import useEditComment from './hooks/useEditComment';
import CommentInput from './CommentInput';
import useCreateReply from './hooks/useCreateReply';
import { useSelector } from 'react-redux';
import useDeleteComment from './hooks/useDeleteComment';
import Modal from '../App/Modals';

function CommentItem({comment}) {
  const player = useSelector(state => state.auth.player);
  const [hovering, setHovering] = useState(false)
  const { ref1, commentData, editing, setCommentData, handleEdit, handleCommentInput, updateComment } = useEditComment(comment);
  const { ref2 , replying, setReplying, handleReplying, text, handleInput, createComment } = useCreateReply(comment?.id)
  const { deleting, setDeleting, deleteComment } = useDeleteComment();

  if (!comment) return <div>loading...</div>

  const isReply = comment?.replyTo !== null;
  const month = format(parseISO(comment.updatedAt), 'MMM')
  const day = format(parseISO(comment.updatedAt), 'dd')
  const year = format(parseISO(comment.updatedAt), 'yy')
  const time = format(parseISO(comment.updatedAt), 'p')
  const formattedTime = `${month} ${day} '${year} - ${time}`;





  return (
  <>
    {
      deleting &&
        <Modal
          title="Delete Comment"
          message="Are you sure you want to delete this comment?"
          confirm={() => deleteComment(comment)}
          decline={() => setDeleting(false)}
      />
    }
    <li onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} ref={ref1} className={`comments__item--wrapper ${editing && 'editing-comment'}`}>
        <CommentControls
          comment={comment}
          editing={editing}
          setDeleting={setDeleting}
          handleReplying={handleReplying}
          handleEdit={handleEdit}
          updateComment={updateComment}
          visible={editing || replying || hovering }
        />
        <div className='comments__item--contents'>
          {
            isReply ?
            <div className='comments__item--reply_spacer'>
              <TbArrowForward className='comments__item--reply_spacer_arrow' />
            </div> :
            null
          }
          <div className='players__item--wrapper'>
              <div
                  className='players__item--image'
                  style={{backgroundImage: `url(${comment.Player?.profileImage})`}}/>
          </div>
          <div className='players__item--text'>
            <div className='flex'>
              <h5>{comment.Player?.name}</h5>
              <small className='comment__timestamp'>{formattedTime}</small>
            </div>
            {
              editing ?
              <CommentInput handleCommentInput={handleCommentInput} comment={comment} /> :
              <p>{comment.text}</p>
            }
          </div>
        </div>
      </li>
      {
        replying &&
        <li ref={ref2} className={`comments__item--wrapper editing-comment`}>
          <CommentControls
            comment={comment}
            editing={editing}
            replying={replying}
            handleReplying={handleReplying}
            handleEdit={handleEdit}
            createComment={createComment}
            visible={ replying }
          />
          <div className='comments__item--contents'>
            <div className='comments__item--reply_spacer'>
              <TbArrowForward className='comments__item--reply_spacer_arrow' />
            </div>
            <div className='players__item--wrapper'>
                <div
                    className='players__item--image'
                    style={{backgroundImage: `url(${player?.profileImage})`}}/>
            </div>
            <div className='players__item--text'>
            <div className='flex'>
              <h5>{player?.name}</h5>
              {/* <small className='comment__timestamp'>{formattedTime}</small> */}
            </div>
            <CommentInput handleCommentInput={handleInput} comment={null} />
          </div>
          </div>
        </li>
      }
    </>
  )
}

export default CommentItem
