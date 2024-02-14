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

function SingleTeam() {
    const { id } = useParams();
    const [ tabView, setTabView ] = useState('details')
    const { auth, navigate } = useApp();
    const { onRequestToJoinTeam, onRequestToLeaveTeam } = useMembership();
    const { data: team, error: teamErr, isLoading: teamLoading } = useQuery(['team', id], () => getTeam(id));
    const { data: membership, isLoading: membershipLoading } = useQuery(['membership-status'], () => getTeamMembershipStatus(id))

    if (teamLoading) return <LoadingData />

    const teamData = team?.data;
    const membershipData = membership?.data;
    const isHost = auth?.id === teamData?.captain.id

    return (
        <motion.main {...base_animations} className='page teams'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
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
            </motion.header>
            <header className='tab_header'>
                    <div className='float_left tabs'>
                        <p className={`tab bold ${tabView === 'details' && 'active-tab'}`} onClick={() => setTabView('details')}>Details</p>
                        <p className={`tab bold ${tabView === 'feed' && 'active-tab'}`} onClick={() => setTabView('feed')}>Live Chat</p>
                        <p className={`tab bold ${tabView === 'members' && 'active-tab'}`} onClick={() => setTabView('members')}>Members</p>
                    </div>
                    <div className='float_right'>
                    </div>
                </header>
                <motion.section variants={parent_variants} {...base_animations} className='section scroll'>
                    {
                        tabView === 'details' ?
                        <TeamDetails team={teamData} /> :
                        tabView === 'feed' ?
                        <TeamFeed team={teamData} /> :
                        <TeamMembers membership={membershipData} />
                    }
                </motion.section>
        </motion.main>
    )
}

export default SingleTeam
