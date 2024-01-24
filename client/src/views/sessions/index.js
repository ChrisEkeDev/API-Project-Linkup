
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import useSessions from './hooks/useSessions'
import useSessionSearch from './hooks/useSessionSearch';
import Scroll from '../../components/shared/scroll';
import { page_transitions } from '../../constants/animations';
import { PiPlusBold, PiMagnifyingGlassBold, PiCoffee } from 'react-icons/pi';
import LoadingData from '../../components/shared/loading'


function Sessions() {
  const { auth, navigate } = useApp();
  const sessionsData = useSelector(state => state.sessions.mySessions);
  const sessions = Object.values(sessionsData)
  const createdSessions = sessions.filter(session => session.creator.id === auth.id)
  const joinedSessions = sessions.filter(session => session.creator.id !== auth.id)
  const { loading } = useSessions();


  if (loading) return <LoadingData/>

  return (
      <motion.main {...page_transitions} className='page sessions' >
          <header className='page_header'>
            <h2>My Sessions</h2>
            <Button
                label="Create New Session"
                styles="primary"
                icon={PiPlusBold}
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
                <PiCoffee className='icon'/>
                <p className='sm bold'>No Teams Created</p>
              </div>
              }

            </section>
            <section className='list_items'>
              <span className='section_label xs bold'>{joinedSessions.length} Session{joinedSessions.length === 1 ? null : 's'} attending</span>
              <ul>
                {
                  joinedSessions.map(session => (
                    <SessionItem session={session}/>
                  ))
                }
              </ul>
            </section>
          </Scroll>
      </motion.main>
  )
}

export default Sessions
