import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import UpdateGroup from '../UpdateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleGroup } from '../../store/groups';



function UpdateGroupWrapper() {
  const { groupId } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const dispatch = useDispatch();
  const group = useSelector(state => state.groups.singleGroup)

  useEffect(() => {
    dispatch(thunkGetSingleGroup(groupId))
    .then(() => setIsLoading(false))
  }, [dispatch])

  if (isLoading || !group) return <div className='loading'>Loading...</div>

  return <UpdateGroup group={group}/>
}

export default UpdateGroupWrapper
