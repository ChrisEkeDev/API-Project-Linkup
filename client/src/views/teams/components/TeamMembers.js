import { AnimatePresence, motion } from 'framer-motion'
import MemberItem from './MemberItem'
import { parent_variants } from '../../../constants/animations';
import ProfileImage from '../../../components/shared/profileImage'
import { statusOrder } from '../../../constants/constants'
import React from 'react'
import { useSelector } from 'react-redux';
import Scroll from '../../../components/shared/scroll';

function TeamMembers({isMember}) {
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships);
    const isPlayerHost = isMember.status === 'host'
    const isPlayerCoHost = isMember.status === 'co-host'
    const sortedMemberships = teamMembershipsArr.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status]
    })

    let filteredMemberships = sortedMemberships;
    if (!isPlayerHost || !isPlayerCoHost) {
        filteredMemberships = sortedMemberships.filter(x => x.status !== 'pending')
    }

    return (
        <Scroll>
            <motion.ul className='members_list container_border'>
            <span className='section_label xs bold'>{teamMembershipsArr.length} Members</span>
                    <AnimatePresence>
                        {
                            teamMembershipsArr.map(membership => (
                                <MemberItem
                                    key={membership.id}
                                    isMember={isMember}
                                    membership={membership}
                                />
                            ))
                        }
                    </AnimatePresence>
            </motion.ul>
        </Scroll>
    )
}

export default TeamMembers
