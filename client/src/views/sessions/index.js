
import { motion } from 'framer-motion';
import './styles.scss';
import SessionItem from './components/SessionItem';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import Scroll from '../../components/shared/scroll';
import { page_transitions } from '../../constants/animations';
import { TbCirclePlus, TbError404  } from 'react-icons/tb';
import LoadingData from '../../components/shared/loading'
import { useQuery } from 'react-query';
import { getMySessions } from '../../store/auth';


function Sessions() {
  const { auth, navigate } = useApp();
  const { data: sessions, error: sessionsErr, isLoading: sessionsLoading} = useQuery('my-sessions', getMySessions);

  if (sessionsLoading) return <LoadingData/>
  if (sessionsErr) return <div>Error getting your sessions</div>

  const createdSessions = sessions.filter(session => session.creator.id === auth.id)
  const joinedSessions = sessions.filter(session => session.creator.id !== auth.id)

  return (
      <motion.main {...page_transitions} className='page sessions' >
          <header className='page_header'>
            <h2>My Sessions</h2>
            <Button
                label="Create New Session"
                styles="primary"
                icon={TbCirclePlus}
                action={() => navigate('/sessions/new')}
            />
          </header>
          <Scroll>
            <section className='list_items'>
              <span className='section_label xs bold'>{createdSessions.length} Session{createdSessions.length === 1 ? null : 's'} created</span>
              {
                createdSessions.length > 0 ?
                <ul>
                {
                  createdSessions.map(session => (
                    <SessionItem session={session}/>
                  ))
                }
              </ul> :
              <div className="no_content">
                <TbError404 className='icon'/>
                <p className='sm bold'>No Sessions Created</p>
              </div>
              }

            </section>
            <section className='list_items'>
              <span className='section_label xs bold'>{joinedSessions.length} Session{joinedSessions.length === 1 ? null : 's'} attending</span>
              {
                joinedSessions.length > 0 ?
                <ul>
                  {
                    joinedSessions.map(session => (
                      <SessionItem session={session}/>
                    ))
                  }
                </ul> :
                <div className="no_content">
                  <TbError404 className='icon'/>
                  <p className='sm bold'>No Sessions Joined Yet</p>
                </div>

              }
            </section>
          </Scroll>
      </motion.main>
  )
}

export default Sessions
