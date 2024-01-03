
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import useSearch from './hooks/useSearch';
import Scroll from '../../components/shared/scroll';
import { parent_variants, base_animations } from '../../constants/animations';
import { TbPlus, TbSearch } from 'react-icons/tb';


function Sessions() {
  const sessions = useSelector(state => state.sessions.allSessions);
  const { navigate } = useApp();
  const {
    query,
    sortBy,
    handleSort,
    handleInput,
    searchSessions
  } = useSearch()

  return (
      <motion.main className='page sessions'>
        <div className='sessions_search'>
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
              action={searchSessions}
            />
          </div>
          <div className='float_right'>
              <SessionsSorter sortBy={sortBy} setSortBy={handleSort} />
          </div>
        </div>
        <header className='header'>
            <h2>{sessions.length} Sessions</h2>
            <div className='actions'>
              <Button
                label='New Session'
                styles="secondary new_session-button"
                action={() => navigate(ROUTE.NEW_SESSION)}
                icon={TbPlus}
              />
            </div>
        </header>
        <Scroll>
          <section className='section'>
            <motion.ul
              variants={parent_variants}
              {...base_animations}
              className='session_list'>
                {sessions.map(session => (
                  <SessionItem session={session} />
                ))}
            </motion.ul>
          </section>
        </Scroll>
      </motion.main>
  )
}

export default Sessions
