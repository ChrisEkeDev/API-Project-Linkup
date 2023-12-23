import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles.scss';
import SessionItem from './components/SessionItem';
import * as ROUTE from '../../constants/routes';
import SessionsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import useSearch from './hooks/useSearch';
import LoadingData from '../../components/shared/loading';
import Scroll from '../../components/shared/scroll';
import { sortFunctions } from '../../constants/constants';
import { parent_variants, base_animations } from '../../constants/animations';
import { TbPlus, TbSearch } from 'react-icons/tb';


function Sessions() {
  const { loading, sortBy, handleSort, sessions, handleInput } = useSearch()
  const { navigate } = useApp();


  if (loading) return <LoadingData/>

  return (
      <motion.main className='page sessions'>
        <div className='sessions_search'>
            <input
                className='search_input'
                placeholder="Search by name or address"
            />
            <div className='float_right'>
                <SessionsSorter sortBy={sortBy} setSortBy={handleSort} />
                {/* <SessionsSorter sortBy={sortBy} setSortBy={handleSort} /> */}
                <Button
                    icon={TbSearch}
                    label="Search"
                    styles="primary"
                    action={() => alert("Coming Soon")}
                />
            </div>
        </div>
        <header className='header'>
            <h2>Showing All Sessions ({sessions.length})</h2>
            <div className='actions'>
              {/* <SessionsSorter sortBy={sortBy} setSortBy={setSortBy}/> */}
              <Button
                label='New Session'
                styles="secondary new_session-button"
                action={() => navigate(ROUTE.NEW_SESSION)}
                icon={TbPlus  }
              />
            </div>
        </header>
        <Scroll>
          <section className='section'>
            <motion.ul
              variants={parent_variants}
              {...base_animations}
              className='session_list'>
                {sessions.sort(sortFunctions[sortBy]).map(session => (
                  <SessionItem session={session} />
                ))}
            </motion.ul>
          </section>
        </Scroll>
      </motion.main>
  )
}

export default Sessions
