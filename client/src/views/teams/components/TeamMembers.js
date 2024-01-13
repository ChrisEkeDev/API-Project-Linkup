import { motion } from 'framer-motion'
import MemberItem from './MemberItem'
import { statusOrder } from '../../../constants/constants'
import React from 'react'
import { useSelector } from 'react-redux'

function TeamMembers({isAuth}) {
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships);
    const sortedMemberships = teamMembershipsArr.sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status]
    })

    let filteredMemberships = sortedMemberships;
    if (!isAuth) {
        filteredMemberships = sortedMemberships.filter(x => x.status !== 'pending')
    }

    return (
        <motion.ul className='members_list'>
            {
                filteredMemberships.map(membership => (
                    <MemberItem
                        key={membership.id}
                        isAuth={isAuth}
                        membership={membership}
                    />
                ))
            }
        </motion.ul>
    )
}

export default TeamMembers
