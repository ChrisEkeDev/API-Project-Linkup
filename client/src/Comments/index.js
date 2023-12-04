import React from 'react'
import { useParams } from 'react-router-dom';
import CommentControls from './CommentControls';
import useGetComments from './hooks/useGetComments'
import { useSelector } from 'react-redux';
import { sortComments } from './utils/sortComments';
import CommentInput from './CommentInput';
import useCreateComment from './hooks/useCreateComment';
import CommentItem from './CommentItem'
import Button from '../Shared/components/Button';
import './Styles.scss';
import { TbPlus } from 'react-icons/tb';
import PageSection from '../Shared/components/Layout/PageSection';
import SectionHeader from '../Shared/components/Layout/SectionHeader';

function Comments() {
    const { id } = useParams();
    const commentData = useSelector(state => state.comments.comments);

    const [ data, loading ] = useGetComments(id);
    const player = useSelector(state => state.auth.player);
    const { ref3, creating, setCreating, handleCreating, text, handleInput, createComment } = useCreateComment();



    if (loading || data === false || !commentData) return <div>loading...</div>

    const comments = sortComments(Object.values(commentData));

    return (
        <PageSection>
            <SectionHeader>
            <h2>Comments</h2>
                <Button
                    styles="primary page--button"
                    label="New Comment"
                    icon={TbPlus    }
                    action={setCreating}
                />
            </SectionHeader>
            <ul className='comments--list'>
                {
                creating &&
                <li ref={ref3} className={`comments__item--wrapper new-comment`}>
                    <CommentControls
                        creating={creating}
                        handleCreating={handleCreating}
                        createComment={createComment}
                        visible={ creating }
                    />
                    <div className='comments__item--contents'>
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
                {comments.map(comment => (
                    <CommentItem comment={comment}/>
                ))}
            </ul>
        </PageSection>
    )
}

export default Comments
