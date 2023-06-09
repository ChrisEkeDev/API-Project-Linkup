import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';


function DashboardGroupItem({data}) {
    const group = useSelector(state => state.groups.allGroups[data.groupId]);
    const history = useHistory();

    const organizer = data.status === 'organizer'

    const navigate = (route) => {
        history.push(route)
    }


  return (
        <div onClick={organizer ? () => navigate(`/manage-group/${data.groupId}`) : () => navigate(`/groups/${data.groupId}`)} className='dash_group_item-wrapper'>
            <div className='dash_group_item-image bg-image'  style={{backgroundImage: `url(${group?.previewImage})` }}></div>
            <div className='dash_group_item-information'>
                <h2 className='subheading'>{group.name} </h2>
                <div className='dash_group_item-info_section'>
                    <FaUserFriends className='dash_group-icon'/>
                    <p className='small'>{group.numMembers} members</p>
                </div>
                <div className='dash_group_item-info_section'>
                    <FaMapMarkerAlt className='dash_group-icon'/>
                    <p className='small'>{group.city}, {group.state}</p>
                </div>
            </div>
            <span className='status-node body small'>{group.type}</span>
        </div>
  )
}

export default DashboardGroupItem
