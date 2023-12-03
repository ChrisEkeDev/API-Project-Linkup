import React from 'react';
import { useSelector } from 'react-redux';

function SessionCreator() {
    const session = useSelector(state => state.sessions.singleSession);
    return (
        <div className='sessions__creator--wrapper'>
            <div className='sessions__creator--contents'>
                <div className='players__item--wrapper'>
                    <div
                        className='players__item--image'
                        style={{backgroundImage: `url(${session.creator?.profileImage})`}}/>
                </div>
                <div className='sessions__creator--text'>
                    <h5>Created By</h5>
                    <p>{session.creator?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default SessionCreator
