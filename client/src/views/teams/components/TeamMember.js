import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage';
import { checkin_variants, base_animations } from '../../../constants/animations';

function TeamMember({membership}) {
  return (
    <motion.li variants={checkin_variants} {...base_animations} title={membership.Player.name} className='session_player'>
        <ProfileImage
            player={membership.Player}
            size={4}
        />
        {/* <p className='xs'>{player?.name}</p> */}
    </motion.li>
  )
}

export default TeamMember
