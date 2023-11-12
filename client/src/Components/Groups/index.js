import React, { useEffect, useState }  from 'react'
import GroupItem from './GroupItem';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllGroups } from '../../store/groups';
import DataLoading from '../Loading/DataLoading';
import './Group.css';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.allGroups);
  const normalizedGroups = Object.values(groups);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    dispatch(thunkGetAllGroups())
    .then(() => setIsLoading(false));
}, [dispatch])

  if (isLoading) return <DataLoading fixed={true}></DataLoading>

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
