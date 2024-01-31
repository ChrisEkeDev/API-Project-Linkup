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

function SingleTeam() {
    const { id } = useParams();
    const [ tabView, setTabView ] = useState('details')
    const { auth, navigate } = useApp();
    const { data: team, error: teamErr, isLoading: teamLoading } = useQuery(['team', id], () => getTeam(id));
    const { data: membership, isLoading: membershipLoading } = useQuery(['membership-status'], () => getTeamMembershipStatus(id))
    const isHost = auth?.id === team?.captain.id

    if (teamLoading) return <LoadingData />

    return (
        <motion.main {...base_animations} className='page teams'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
                    <Back />
                    {
                        team?.private ?
                        <TbLock title='Private' className='team_privacy_icon'/> :
                        <TbLockOpen title='Public' className='team_privacy_icon'/>
                    }
                    <p className="lg bold">{team?.name}</p>
                </div>
                <div className='actions'>
                    { auth && (
                        isHost ?
                        <Button
                            styles='secondary'
                            label="Edit Team"
                            icon={TbEditCircle}
                            action={() => navigate(`/teams/${team.id}/update`)}
                        />:
                        <>
                        {
                            membership ?
                            <Button
                                styles='tertiary'
                                loading={membership === 'pending'}
                                icon={
                                    membership === 'pending' ?
                                    CgSpinner :
                                    TbLogout
                                }
                                label={
                                    membership === 'pending' ?
                                    "Awaiting Approval" :
                                    "Leave Team"
                                }
                                // action={() => leaveTeam(team.id)}
                            /> :
                            <Button
                                styles='tertiary'
                                icon={TbLogin2}
                                label="Join Team"
                                // action={() => joinTeam(team.id)}
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
                        <TeamDetails team={team} /> :
                        tabView === 'feed' ?
                        <TeamFeed team={team} /> :
                        <TeamMembers membership={membership} />
                    }
                </motion.section>
        </motion.main>
    )
}

export default SingleTeam
