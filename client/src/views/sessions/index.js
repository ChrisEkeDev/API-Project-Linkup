import React, { useState } from 'react';
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import useSessions from '../../hooks/useSessions';
import LoadingData from '../../components/shared/loading';
import { sortFunctions } from '../../constants/constants';


function Sessions() {
  const [ sortBy, setSortBy] = useState('happeningSoon')
  const { navigate } = useApp();
  const { loading, sessions } = useSessions();


  if (loading) return <LoadingData/>

  return (
      <main className='page sessions'>
        <header className='header'>
            <h2>Showing All Sessions ({sessions.length})</h2>
            <div className='actions'>
              <SessionsSorter sortBy={sortBy} setSortBy={setSortBy}/>
              <Button
                label='New Session'
                styles="new_session-button"
                action={() => navigate(ROUTE.NEW_SESSION)}
              />
            </div>
        </header>
        <section className='section'>
          <ul className='session_list scroll'>
            {sessions.sort(sortFunctions[sortBy]).map(session => (
              <SessionItem session={session} />
            ))}
          </ul>
        </section>
      </main>
  )
}

export default Sessions
