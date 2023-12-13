import React, { useState } from 'react'
import { parse, parseISO, format } from 'date-fns';
import { useApp } from '../../../context/AppContext';
import { TbArrowForward } from 'react-icons/tb';
import useEditComment from '../hooks/useEditComment';
import CommentInput from './CommentInput';
import useCreateReply from '../hooks/useCreateReply';
import { useSelector } from 'react-redux';
import useDeleteComment from '../hooks/useDeleteComment';
import useComment from '../hooks/useComment';
import Button from '../../shared/button';
import ProfileImage from '../../shared/profileImage';

function Comment({ comment }) {
  const { auth } = useApp();
  const {
    ref,
    setValue,
    mode,
    setMode,
    onValueChange,
    createComment,
    updateComment
  } = useComment(comment);
  // const [hovering, setHovering] = useState(false)
  // const { ref1, commentData, editing, setCommentData, handleEdit, handleCommentInput, updateComment } = useEditComment(comment);
  // const { ref2 , replying, setReplying, handleReplying, text, handleInput, createComment } = useCreateReply(comment?.id)
  // const { deleting, setDeleting, deleteComment } = useDeleteComment();

  if (!comment) return <div>loading...</div>

  const isReply = comment?.replyTo !== null;
  const parsedDate = parseISO(comment.updatedAt);
  const month = format(parsedDate, 'MMM')
  const day = format(parsedDate, 'dd')
  const year = format(parsedDate, 'yy')
  const time = format(parsedDate, 'p')
  const formattedTime = `${month} ${day} '${year} - ${time}`;





  return (
  <>
  <li ref={ref} className='comment'>
    { isReply && <TbArrowForward className='reply_icon' /> }
    <ProfileImage
      player={comment?.Player}
      size={4}
    />
    <div className='comment_contents'>
      <div className='comment_creator details'>
        <p>{comment.Player.name}</p>
        <small>{formattedTime}</small>
      </div>
      <textarea
        className='comment_text'
        onChange={onValueChange}
        defaultValue={comment.text || ''}
        disabled={mode !== 'EDITING'}
      >
      </textarea>
  </div>
    <div className='comment_actions'>
      {
        !isReply &&
        <Button
          label='Reply'
          styles="small_button"
          action={() => setMode('REPLYING')}

        />
      }
      <Button
          label="Edit"
          styles="small_button"
          action={() => setMode('EDITING')}
      />
      <Button
          label="Delete"
          styles="small_button"
      />
    </div>
  </li>
    {/* {
      deleting &&
        <Modal
          title="Delete Comment"
          message="Are you sure you want to delete this comment?"
          confirm={() => deleteComment(comment)}
          decline={() => setDeleting(false)}
      />
    } */}
    {/* <li onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} ref={ref1} className={`comments__item--wrapper ${editing && 'editing-comment'}`}>
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
            {/* </div>
            <CommentInput handleCommentInput={handleInput} comment={null} />
          </div>
          </div>
        </li>
      } */}
    </>
  )
}

export default Comment
