import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage';
import { slide_variants, base_animations } from '../../../constants/animations';
import { TbCrown } from 'react-icons/tb';

function TeamMember({membership}) {
  const isHost = membership.status === 'host';
  const isCoHost = membership.status === 'co-host';

  return (
    <motion.li title={membership.Player.name} className='session_player'>
        {
          isHost ? <TbCrown className='player_status_host'/> :
          isCoHost ? <TbCrown className='player_status_co-host'/>:
        null
        }
        <ProfileImage
            player={membership.Player}
            size={4}
        />
    </motion.li>
  )
}

export default TeamMember
