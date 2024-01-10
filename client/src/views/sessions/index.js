
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import useSessionSearch from './hooks/useSessionSearch';
import Scroll from '../../components/shared/scroll';
import { page_transitions } from '../../constants/animations';
import { PiPlusBold, PiMagnifyingGlassBold } from 'react-icons/pi';


function Sessions() {
  const sessions = useSelector(state => state.sessions.mySessions);
  const { navigate } = useApp();

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
              <span className='section_label xs bold'>{sessions.length} Session{sessions.length === 1 ? null : 's'}</span>
              <ul>
                {
                  sessions.map(session => (
                    <SessionItem session={session}/>
                  ))
                }
              </ul>
            </section>
          </Scroll>
        {/* <Scroll>
          <section className='section sessions_list'>
          <span className='section_label xs bold'>{sessions.length} Sessions</span>
            <header className='sub_header float_right'>
                <Button
                  label='New Session'
                  styles="secondary new_session-button"
                  action={() => navigate(ROUTE.NEW_SESSION)}
                  icon={PiPlusBold}
                />
          </header>
            <motion.ul
              variants={parent_variants}
              {...base_animations}
              className='session_list'>
                {sessions.map(session => (
                  <SessionItem session={session} />
                ))}
            </motion.ul>
          </section>
        </Scroll> */}
      </motion.main>
  )
}

export default Sessions
