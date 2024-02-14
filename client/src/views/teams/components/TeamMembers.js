import { AnimatePresence, motion } from 'framer-motion'
import MemberItem from './MemberItem'
import { getTeamMemberships } from '../../../store/teams';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statusOrderMembership } from '../../../constants/constants'
import React from 'react'
import LoadingData from '../../../components/shared/loading';
import Scroll from '../../../components/shared/scroll';

function TeamMembers({membership}) {
    const { id } = useParams();
    const {
        data: memberships,
        error: membershipsErr,
        isLoading: membershipsLoading
    } = useQuery(['team-memberships', id], () => getTeamMemberships(id))

    const isPlayerAuth = membership === 'host' || membership === 'co-host'

    if (membershipsLoading) return <LoadingData />
    if (membershipsErr) return <div>Error</div>

    const membershipsData = memberships.data;

    const sortedMemberships = membershipsData?.sort((a, b) => {
        return statusOrderMembership[a.status] - statusOrderMembership[b.status]
    })

    let filteredMemberships = sortedMemberships;
    if (!isPlayerAuth) {
        filteredMemberships = sortedMemberships.filter(x => x.status !== 'pending')
    }

    return (
        <Scroll>
            <motion.ul className='members_list container_border'>
            <span className='section_label xs bold'>{filteredMemberships.length} Member{filteredMemberships.length === 1 ? '' : 's'}</span>
                    <AnimatePresence>
                        {
                            filteredMemberships.map(member => (
                                <MemberItem
                                    key={member.id}
                                    status={membership}
                                    member={member}
                                />
                            ))
                        }
                    </AnimatePresence>
            </motion.ul>
        </Scroll>
    )
}

export default TeamMembers
