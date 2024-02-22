
import './styles.scss';
import SessionItem from './components/SessionItem';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import Scroll from '../../components/shared/scroll';
import { TbCirclePlus, TbNoCopyright } from 'react-icons/tb';
import LoadingData from '../../components/shared/loading';
import SectionContainer from '../../components/shared/layout/SectionContainer';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';
import { useQuery } from 'react-query';
import { getMySessions } from '../../store/auth';
import NoContent from '../../components/shared/noContent';


function Sessions() {
  const { auth, navigate } = useApp();
  const { data: sessions, error: sessionsErr, isLoading: sessionsLoading} = useQuery('my-sessions', getMySessions);

  if (sessionsLoading) return <LoadingData/>
  if (sessionsErr) return <div>Error getting your sessions</div>

  const sessionsData = sessions.data;
  const createdSessions = sessionsData.filter(session => session.creator.id === auth.id)
  const joinedSessions = sessionsData.filter(session => session.creator.id !== auth.id)

  return (
    <PageContainer>
      <PageHeader>
        <header className='float_full'>
          <h2>My Sessions</h2>
          <Button
              label="Create New Session"
              styles="primary"
              icon={TbCirclePlus}
              action={() => navigate('/sessions/new')}
          />
        </header>
      </PageHeader>
      <Scroll>
        {
          createdSessions.length > 0 ?
          <SectionContainer title={`${createdSessions.length} Session${createdSessions.length === 1 ? null : 's'} created`}>
            <ul>
              {
                createdSessions.map(session => (
                  <SessionItem key={session.id} session={session}/>
                ))
              }
            </ul>
          </SectionContainer>
          :
          <NoContent
              icon={TbNoCopyright}
              message="You haven't created any sessions yet."
          />
        }
        {
          joinedSessions.length > 0 ?
          <SectionContainer title={`${joinedSessions.length} Session${joinedSessions.length === 1 ? null : 's'} attending`}>
            <ul>
              {
                joinedSessions.map(session => (
                  <SessionItem key={session.id} session={session}/>
                ))
              }
            </ul>
          </SectionContainer>
          :
          <NoContent
            icon={TbNoCopyright}
            message="You haven't joined  any sessions yet."
          />
        }

      </Scroll>
    </PageContainer>
  )
}

export default Sessions
