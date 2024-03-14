import Back from '../../components/shared/button/Back';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/button';
import { useQuery } from 'react-query';
import { getSession, getSessionCheckInStatus } from '../../store/sessions';
import { useParams } from 'react-router-dom';
import SessionCheckins from './components/SessionCheckins';
import SessionDetails from './components/SessionDetails';
import SessionFeed from './components/SessionFeed';
import LoadingData from '../../components/shared/loading';
import CountDown from '../../components/countdown';
import { CgSpinner } from 'react-icons/cg';
import { TbUserMinus, TbUserPlus, TbEditCircle, TbLock, TbLockOpen } from 'react-icons/tb';
import useCheckIn from './hooks/useCheckIn';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';
import PageBody from '../../components/shared/layout/PageBody';


function SingleSession() {
    const { id } = useParams();
    const [tabView, setTabView ] = useState('details')
    const { auth, navigate, theme } = useApp();
    const { data: session, error: sessionErr, isLoading: sessionLoading } = useQuery(['session', id], () => getSession(id));
    const { data: checkIn, isLoading: checkInStatusLoading } = useQuery(['check-in-status'], () => getSessionCheckInStatus(id))
    const { onCheckIn, onCheckOut, checkInLoading, checkOutLoading } = useCheckIn()

    if (sessionLoading) return <LoadingData />
    const sessionData = session?.data;
    const checkInData = checkIn?.data;
    const isCreator = auth?.id === sessionData?.creator.id;

    return (
        <PageContainer>
            <PageHeader>
                <header className='float_full'>
                    <div className="float_left">
                        <Back />
                        {
                            sessionData?.private ?
                            <TbLock title='Private' className='team_privacy_icon'/> :
                            <TbLockOpen title='Public' className='team_privacy_icon'/>
                        }
                        <p className="lg bold">{sessionData?.name}</p>
                    </div>
                    <div className='float_right'>
                        <CountDown endTime={sessionData.startDate} expires={sessionData.endDate} />
                        {
                            auth && (
                                isCreator ?
                                <Button
                                    styles='secondary'
                                    label="Edit Session"
                                    icon={TbEditCircle}
                                    action={() => navigate(`/sessions/${sessionData.id}/update`)}
                                /> :
                                <Button
                                    styles={
                                        checkInData ?
                                        checkInData === 'pending'
                                        ? 'secondary'
                                        : 'secondary'
                                        : 'primary'
                                    }
                                    icon={
                                        checkInLoading || checkOutLoading ?
                                        CgSpinner :
                                        checkInData ?
                                        checkInData === 'pending' ?
                                        CgSpinner :
                                        TbUserMinus :
                                        TbUserPlus
                                    }
                                    label={
                                        checkInLoading ?
                                        'Checking In...' :
                                        checkOutLoading ?
                                        'Checking Out...' :
                                        checkInData ?
                                        checkInData === 'pending' ?
                                        'Awaiting Approval' :
                                        'Leave Session':
                                        'Join Session'
                                    }
                                    action={checkInData ? onCheckOut : onCheckIn }
                                    loading={checkInData === 'pending' || checkInLoading || checkOutLoading }
                                />
                            )
                        }
                    </div>
                </header>
                <header className='tab_header flex_full '>
                    <div className='float_left tabs'>
                        <p className={`tab tab-${theme} bold ${tabView === 'details' && 'active-tab'}`} onClick={() => setTabView('details')}>Details</p>
                        <p className={`tab tab-${theme} bold ${tabView === 'feed' && 'active-tab'}`} onClick={() => setTabView('feed')}>Live Chat</p>
                        <p className={`tab tab-${theme} bold ${tabView === 'attendees' && 'active-tab'}`} onClick={() => setTabView('attendees')}>Attendees</p>
                    </div>
                </header>
            </PageHeader>
            <PageBody>
                {
                    tabView === 'details' ?
                    <SessionDetails handleTab={setTabView} session={sessionData} /> :
                    tabView === 'feed' ?
                    <SessionFeed session={sessionData} /> :
                    <SessionCheckins status={checkInData} isCreator={isCreator} />
                }
            </PageBody>
        </PageContainer>
    )
}

export default SingleSession
