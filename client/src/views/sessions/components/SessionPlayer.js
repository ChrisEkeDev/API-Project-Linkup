import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage';
import { checkin_variants, base_animations } from '../../../constants/animations';

function SessionPlayer({checkIn}) {
    const { player } = checkIn;

    return (
        <motion.li variants={checkin_variants} {...base_animations} title={player.name} className='session_player'>
            <ProfileImage
                player={player}
                size={4}
            />
        </motion.li>
    )
}

export default SessionPlayer