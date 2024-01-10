import React from 'react'
import { motion } from 'framer-motion';
import { useApp } from '../../../context/AppContext';
import ProfileImage from '../../../components/shared/profileImage';
import { child_variants } from '../../../constants/animations';
import { format, parseISO } from 'date-fns';
import '../styles.scss';
import { PiLockBold, PiLockOpenBold } from 'react-icons/pi';

function TeamItem({team}) {
    const { navigate, setCurrentLocation } = useApp();
    // const parsedDate = parseISO(team.startDate);
    // const formattedTime = format(parsedDate, 'MM/dd @ h:mm a');

    return (
        <motion.li variants={child_variants} className='team_item'>
            {team.private && <div className='team_privacy'><PiLockBold/></div>}
            <div className='float_left'>
            <ProfileImage
                player={team.captain}
            />
            <div className='team_details'>
                <p className='xs'>{team.captain.name}</p>
                <p className='md bold'>{team.name}</p>
                <div className='member_preview'>
                    {
                        team.memberPreview.length > 1 ?
                        team.memberPreview.map(member => (
                            <div
                                title={member.name}
                                style={{backgroundImage: `url(${member.profileImage})`}}
                                className='team_member_preview'
                            />
                        )) :
                        <p>No members</p>
                    }
                </div>
            </div>
            </div>
            <div className='player_count'>
                <h2 className='count accent'>{team.members}</h2>
                <small>Members</small>
            </div>
        </motion.li>
    )
}

export default TeamItem
