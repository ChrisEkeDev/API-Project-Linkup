import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';


function DashboardGroupItem({group, organizer}) {
    const id = group.id;
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }


  return (
    <li>
        <div onClick={() => navigate(`/groups/${group.id}`)} className='dash_group_item-wrapper'>
            <div className='dash_group_item-image'></div>
            <div className='dash_group_item-information'>
                <h2 className='subheading'>{group.name} - <span className='body small'>{group.type}</span></h2>
                <div className='dash_group_item-info_section'>
                    <FaUserFriends className='dash_group-icon'/>
                    <p className='small'>{group.numMembers} members</p>
                </div>
                <div className='dash_group_item-info_section'>
                    <FaMapMarkerAlt className='dash_group-icon'/>
                    <p className='small'>{group.city}, {group.state}</p>
                </div>
            </div>
        </div>
    </li>
  )
}

export default DashboardGroupItem
