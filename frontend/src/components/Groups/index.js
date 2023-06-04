import React, { useEffect }  from 'react'
import GroupItem from './GroupItem';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllGroups } from '../../store/groups';
import './Group.css';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.allGroups);
  const normalizedGroups = Object.values(groups);

  useEffect(() => {
    dispatch(thunkGetAllGroups());
}, [dispatch])

  return (
    <ul className='groups-wrapper'>
        {normalizedGroups.map(group => {
            return (
                <GroupItem key={group.id} id={group.id}/>
            )
        })}
    </ul>
  )
}

export default Groups
