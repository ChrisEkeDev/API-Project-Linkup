import Back from '../../components/shared/button/Back';
import { useState } from 'react';
import TeamMembers from './components/TeamMembers';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/button';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import LoadingData from '../../components/shared/loading';
import { getTeamMembershipStatus, getTeam } from '../../store/teams';
import { CgSpinner } from 'react-icons/cg';
import { TbLogout, TbLogin2, TbLockOpen, TbLock, TbEditCircle } from 'react-icons/tb'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import TeamDetails from './components/TeamDetails';
import TeamFeed from './components/TeamFeed'
import useMembership from './hooks/useMembership';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

function SingleTeam() {
    const { id } = useParams();
    const [ tabView, setTabView ] = useState('details')
    const { auth, navigate, settings } = useApp();
    const { onRequestToJoinTeam, onRequestToLeaveTeam } = useMembership();
    const { data: team, error: teamErr, isLoading: teamLoading } = useQuery(['team', id], () => getTeam(id));
    const { data: membership, isLoading: membershipLoading } = useQuery(['membership-status'], () => getTeamMembershipStatus(id))

    if (teamLoading) return <LoadingData />

    const settingsData = settings?.data;
    const { theme } = settingsData;
    const teamData = team?.data;
    const membershipData = membership?.data;
    const isHost = auth?.id === teamData?.captain.id

    return (
        <PageContainer>
            <PageHeader>
                <header className='float_full'>
                    <div className="float_left">
                        <Back />
                        {
                            teamData?.private ?
                            <TbLock title='Private' className='team_privacy_icon'/> :
                            <TbLockOpen title='Public' className='team_privacy_icon'/>
                        }
                        <p className="lg bold">{teamData?.name}</p>
                    </div>
                    <div className='actions'>
                        { auth && (
                            isHost ?
                            <Button
                                styles='secondary'
                                label="Edit Team"
                                icon={TbEditCircle}
                                action={() => navigate(`/teams/${teamData.id}/update`)}
                            />:
                            <>
                            {
                                membershipData ?
                                <Button
                                    styles='tertiary'
                                    loading={membershipData === 'pending'}
                                    icon={
                                        membershipData === 'pending' ?
                                        CgSpinner :
                                        TbLogout
                                    }
                                    label={
                                        membershipData === 'pending' ?
                                        "Awaiting Approval" :
                                        "Leave Team"
                                    }
                                    action={() => onRequestToLeaveTeam(teamData.id)}
                                /> :
                                <Button
                                    styles='tertiary'
                                    icon={TbLogin2}
                                    label="Join Team"
                                    action={() => onRequestToJoinTeam(teamData.id)}
                                />
                            }
                            </>
                        )}
                    </div>
                </header>
                <header className='tab_header flex_full'>
                    <div className='float_left tabs'>
                        <p className={`tab tab-${theme} bold ${tabView === 'details' && 'active-tab'}`} onClick={() => setTabView('details')}>Details</p>
                        <p className={`tab tab-${theme} bold ${tabView === 'feed' && 'active-tab'}`} onClick={() => setTabView('feed')}>Live Chat</p>
                        <p className={`tab tab-${theme} bold ${tabView === 'members' && 'active-tab'}`} onClick={() => setTabView('members')}>Members</p>
                    </div>
                </header>
            </PageHeader>
            {
                tabView === 'details' ?
                <TeamDetails team={teamData} /> :
                tabView === 'feed' ?
                <TeamFeed team={teamData} /> :
                <TeamMembers membership={membershipData} />
            }
        </PageContainer>
    )
}

export default SingleTeam
