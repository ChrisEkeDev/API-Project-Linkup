import Back from '../../components/shared/button/Back';
import { useState, useEffect } from 'react';
import TeamMembers from './components/TeamMembers';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/button';
import Modal from '../../components/shared/modal';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import LoadingData from '../../components/shared/loading';
import { thunkGetSingleTeam, thunkGetTeamSessions } from '../../store/teams';
import { thunkGetTeamFeed } from '../../store/chats'
import { thunkGetTeamMemberships } from '../../store/memberships'
import Scroll from '../../components/shared/scroll';
import useMemberships from './hooks/useMemberships';
import { CgSpinner } from 'react-icons/cg';
import { PiXBold, PiUserPlusBold , PiUserMinusBold, PiPencilSimpleLineFill, PiTrashBold, PiSignOutBold, PiLockFill, PiLockOpen, PiLockOpenBold } from 'react-icons/pi'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import TeamDetails from './components/TeamDetails';
import TeamFeed from './components/TeamFeed'

function SingleTeam({team, memberships}) {
    const [tabView, setTabView ] = useState('details')
    const { auth, navigate } = useApp();
    const membershipsArr = Object.values(memberships)
    const isMember = membershipsArr.find(membership => membership.playerId === auth.id);
    const isHost = auth.id === team.captain.id
    const { leaveTeam, joinTeam } = useMemberships();

    return (
        <motion.main {...base_animations} className='page teams'>
            <motion.header variants={child_variants} className='header'>
                <div className="flex">
                    <Back />
                    {
                        team.private ?
                        <PiLockFill title='Private' className='team_privacy_icon'/> :
                        <PiLockOpenBold title='Public' className='team_privacy_icon'/>
                    }
                    <p className="lg bold">{team.name}</p>
                </div>
                <div className='actions'>
                    {
                        isHost ?
                            <Button
                                styles='secondary'
                                label="Edit Team"
                                icon={PiPencilSimpleLineFill}
                                action={() => navigate(`/teams/${team.id}/update`)}
                            />:
                        <>
                            {
                                isMember ?
                                <Button
                                    styles='tertiary'
                                    loading={isMember.status === 'pending'}
                                    icon={
                                        isMember.status === 'pending' ?
                                        CgSpinner :
                                        PiSignOutBold
                                    }
                                    label={
                                        isMember.status === 'pending' ?
                                        "Awaiting Approval" :
                                        "Leave Team"
                                    }
                                    action={() => leaveTeam(team.id)}
                                /> :
                                <Button
                                    styles='tertiary'
                                    icon={PiSignOutBold}
                                    label="Join Team"
                                    action={() => joinTeam(team.id)}
                                />
                            }
                        </>
                    }
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
                        tabView === 'feed' ?
                        <TeamFeed />:
                        tabView === 'members' ?
                        <TeamMembers isMember={isMember} /> :
                        <TeamDetails />
                    }
                </motion.section>
        </motion.main>
    )
}

function SingleTeamWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const singleTeam = useSelector(state => state.teams.singleTeam)
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamFeed = useSelector(state => state.chats.teamFeed)
    const teamSessions = useSelector(state => state.teams.teamSessions)

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const singleTeamData = await dispatch(thunkGetSingleTeam(id));
                const teamMembershipData = await dispatch(thunkGetTeamMemberships(id))
                const teamFeedData = await dispatch(thunkGetTeamFeed(id))
                const teamSessionsData = await dispatch(thunkGetTeamSessions(id))
                if (
                    singleTeamData.status === 200 && singleTeam
                    && teamMembershipData.status === 200 && teamMemberships
                    && teamFeedData.status == 200 && teamFeed
                    && teamSessionsData.status === 200 && teamSessions
                ) {
                    setLoading(false);
                }
            } catch(e) {
                console.log(e)
            }
        }
        loadTeam();

    }, [dispatch, id])

    if (loading) return <LoadingData/>

    return (
        <SingleTeam team={singleTeam} memberships={teamMemberships} feed={teamFeed} teamSessions={teamSessions} />
    )
}

export default SingleTeamWrapper
