import { AnimatePresence, motion } from 'framer-motion'
import MemberItem from './MemberItem'
import { getTeamMemberships } from '../../../store/teams';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statusOrderMembership } from '../../../constants/constants'
import List from '../../../components/shared/layout/List'
import LoadingData from '../../../components/shared/loading';
import Scroll from '../../../components/shared/scroll';
import SectionContainer from '../../../components/shared/layout/SectionContainer';

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
            <SectionContainer title={`${filteredMemberships?.length} Member${filteredMemberships?.length === 1 ? '' : 's'}`}>
                <List>
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
                </List>
            </SectionContainer>
        </Scroll>
    )
}

export default TeamMembers
