import React from 'react'
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { child_variants } from '../../../constants/animations';
import '../styles.scss';
import { TbUsersGroup , TbLock  } from 'react-icons/tb';

function TeamItem({team}) {
    const { navigate, theme } = useApp();

    return (
        <motion.li
            variants={child_variants}
            onClick={()=> navigate(`/teams/${team.id}`)}
            className={`team_item team_item-${theme}`}>
            <div className='float_left'>
            <ProfileImage
                player={team.captain}
            />
            <div className='team_details'>
                <p className='sm'>Created by <span className='bold'>{team.captain.name}</span></p>
                <p className='md bold accent'>{team.name}</p>
                <p className='sm'>{team.members} member{team.members === 1 ? null : 's'}</p>
            </div>
            </div>
            <div className='player_count'>
                {
                    team.private ?
                    <TbLock  className='team_privacy accent'/> :
                    <TbUsersGroup  className='team_privacy accent'/>
                }
                <small>{team.private ? 'Private' : 'Public'}</small>
            </div>
        </motion.li>
    )
}

export default TeamItem
