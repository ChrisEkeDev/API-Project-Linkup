import React from 'react'
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { child_variants } from '../../../constants/animations';
import '../styles.scss';
import { TbUsersGroup , TbLock  } from 'react-icons/tb';

function TeamItem({team}) {
    const { navigate } = useApp();
    return (
        <motion.li
            variants={child_variants}
            onClick={()=> navigate(`/teams/${team.id}`)}
            className='team_item'>
            <div className='float_left'>
            <ProfileImage
                player={team.captain}
            />
            <div className='team_details'>
                <p className='sm bold'>Created by {team.captain.name}</p>
                <p className='md bold'>{team.name}</p>
                <p className='sm bold'>{team.members} member{team.members === 1 ? null : 's'}</p>
            </div>
            </div>
            <div className='player_count'>
                {
                    team.private ?
                    <TbLock  className='team_privacy'/> :
                    <TbUsersGroup  className='team_privacy'/>
                }
                <small>{team.private ? 'Private' : 'Public'}</small>
            </div>
        </motion.li>
    )
}

export default TeamItem
