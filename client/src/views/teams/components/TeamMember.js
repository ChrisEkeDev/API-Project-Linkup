import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage';
import { slide_variants, base_animations } from '../../../constants/animations';
import { PiCrownBold, PiCrownFill } from 'react-icons/pi';

function TeamMember({membership}) {
  const isHost = membership.status === 'host';
  const isCoHost = membership.status === 'co-host';

  return (
    <motion.li title={membership.Player.name} className='session_player'>
        {
          isHost ? <PiCrownFill className='player_status_crown'/> :
          isCoHost ? <PiCrownBold className='player_status_crown'/>:
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
