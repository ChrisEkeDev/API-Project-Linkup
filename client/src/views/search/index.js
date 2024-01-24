
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import './styles.scss';
import TeamItem from '../teams/components/TeamItem';
import SessionItem from '../../views/sessions/components/SessionItem';
import * as ROUTE from '../../constants/routes';
import Sorter from './components/Sorter';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import useSearch from './hooks/useSearch';
import Scroll from '../../components/shared/scroll';
import { parent_variants, base_animations } from '../../constants/animations';
import { TbSearch } from "react-icons/tb";
import { useState } from 'react';


function Search() {
    const [showingResults, setShowingResults] = useState('sessions')
    const sessions = useSelector(state => state.sessions.searchedSessions);
    const teams = useSelector(state => state.teams.searchedTeams)
    const { navigate } = useApp();
    const {
        query,
        sortBy,
        handleSort,
        handleInput,
        search
    } = useSearch()

  return (
      <motion.main className='page search'>
        <div className='page_header'>
          <div className='float_right search_flex'>
            <input
                value={query}
                onChange={handleInput}
                className='search_input'
                placeholder="Search by name or address"
            />
            <IconButton
              icon={TbSearch}
              styles="primary"
              action={search}
            />
          </div>
        </div>
            <header className='tab_header'>
                <div className='float_left tabs'>
                    <p className={`tab bold ${showingResults === 'sessions' && 'active-tab'}`} onClick={() => setShowingResults('sessions')}>Sessions</p>
                    <p className={`tab bold ${showingResults === 'teams' && 'active-tab'}`} onClick={() => setShowingResults('teams')}>Teams</p>
                </div>
                <div className='float_right'>
                    <Sorter {...{ sortBy, showingResults, handleSort}} />
                </div>
            </header>
            <Scroll>
                <section className='section results'>
                    <span className='section_label xs bold'>
                        {showingResults === 'teams' ? teams.length : sessions.length} {showingResults}
                    </span>
                    {showingResults === 'teams' ?
                    <motion.ul
                        variants={parent_variants}
                        {...base_animations}
                        className='result_list'>
                            {teams.map(team => (
                                <TeamItem team={team} />
                            ))}
                    </motion.ul> :
                    <motion.ul
                        variants={parent_variants}
                        {...base_animations}
                        className='result_list'>
                            {sessions.map(session => (
                                <SessionItem session={session} />
                            ))}
                    </motion.ul>
                    }

                </section>
            </Scroll>
      </motion.main>
  )
}

export default Search
