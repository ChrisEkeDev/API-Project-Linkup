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
import { thunkGetSingleTeam } from '../../store/teams';
import { thunkGetTeamMemberships } from '../../store/memberships'
import Scroll from '../../components/shared/scroll';
import useMemberships from './hooks/useMemberships';
import { CgSpinner } from 'react-icons/cg';
import { PiXBold, PiUserPlusBold , PiUserMinusBold, PiPencilSimpleLineFill, PiTrashBold, PiSignOutBold  } from 'react-icons/pi'
import { base_animations, child_variants, parent_variants } from '../../constants/animations';
import TeamDetails from './components/TeamDetails';

function SingleTeam({team, memberships}) {
    const [tabView, setTabView ] = useState('details')
    const { auth, navigate } = useApp();
    const isMember = Object.values(memberships).find(membership => membership.playerId === auth.id);
    const isHost = auth.id === team.captain.id
    const isAuth = isHost || isMember?.status === 'co-host';
    const { leaveTeam, joinTeam } = useMemberships();

    return (
        <motion.main {...base_animations} className='page teams'>
            <motion.header variants={child_variants} className='header'>
                <Back route={`/teams`}/>
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
                        {/* <p className={`tab bold ${tabView === 'chat' && 'active-tab'}`} onClick={() => setTabView('chat')}>Chat</p> */}
                        <p className={`tab bold ${tabView === 'members' && 'active-tab'}`} onClick={() => setTabView('members')}>Members</p>
                    </div>
                    <div className='float_right'>
                    </div>
                </header>
            <Scroll>
                <motion.section variants={parent_variants} {...base_animations} className='section scroll'>
                    <span className='section_label xs bold'>
                        {/* {tabView === 'teams' ? teams.length : sessions.length} {showingResults} */}
                    </span>
                    {
                        tabView === 'chat' ?
                        <div>Chat</div>:
                        tabView === 'members' ?
                        <TeamMembers isAuth={isAuth} /> :
                        <TeamDetails />
                    }
                </motion.section>
            </Scroll>
        </motion.main>
    )
}

function SingleTeamWrapper() {
    const { id } = useParams();
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true);
    const singleTeam = useSelector(state => state.teams.singleTeam)
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const singleTeamData = await dispatch(thunkGetSingleTeam(id));
                const teamMembershipData = await dispatch(thunkGetTeamMemberships(id))
                if (singleTeamData.status === 200 && singleTeam && teamMembershipData.status === 200 && teamMemberships) {
                    setLoading(false);
                }
                console.log()
            } catch(e) {
                console.log(e)
            }
        }
        loadTeam();

    }, [dispatch, id])

    if (loading) return <LoadingData/>

    return (
        <SingleTeam team={singleTeam} memberships={teamMemberships} />
    )
}

export default SingleTeamWrapper
