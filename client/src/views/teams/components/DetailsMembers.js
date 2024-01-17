import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage'
import TeamMember from './TeamMember';
import ClickDragScroll from '../../../components/shared/clickDragScroll';

function DetailsMembers(props) {
    const {memberships } = props;
    return (
        <ClickDragScroll title={`${memberships.length} Member${memberships.length === 1 ? null : 's'}`}>
            {
                memberships.map((membership) => {
                    return <TeamMember key={membership.id} membership={membership}/>
                })
            }
        </ClickDragScroll>
  )
}

export default DetailsMembers
