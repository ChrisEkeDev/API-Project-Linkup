
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import useSort from './hooks/useSort';


function Sessions() {
  const { sessions, navigate } = useApp();
  const { sortedSessions, setSortBy } = useSort(sessions)

  return (
      <main className='page sessions'>
        <header className='header'>
            <h2>Showing All Sessions ({sessions.length})</h2>
            <div className='actions'>
              <SessionsSorter setSortBy={setSortBy}/>
              <Button
                label='New Session'
                styles="new_session-button"
                action={() => navigate(ROUTE.NEW_SESSION)}
              />
            </div>
        </header>
        <section className='section'>
          <ul className='session_list scroll'>
            {sortedSessions.map(session => (
              <SessionItem session={session} />
            ))}
          </ul>
        </section>
      </main>
  )
}

export default Sessions
