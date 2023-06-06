import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateEvent from '../UpdateEvent'
import { thunkGetSingleEvent } from '../../store/events';

function UpdateEventWrapper() {
    const { eventId } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.singleEvent)

    useEffect(() => {
        dispatch(thunkGetSingleEvent(eventId))
        .then(() => setIsLoading(false))
    }, [dispatch])

if (isLoading || !event) return <div className='loading'>Loading...</div>

  return <UpdateEvent event={event}/>
}

export default UpdateEventWrapper
