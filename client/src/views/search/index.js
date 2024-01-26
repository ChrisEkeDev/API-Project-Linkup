
import TeamItem from '../teams/components/TeamItem';
import SessionItem from '../../views/sessions/components/SessionItem';
import Sorter from './components/Sorter';
import useSearch from './hooks/useSearch';
import Scroll from '../../components/shared/scroll';
import { useQuery } from 'react-query';
import { searchTeams } from '../../store/teams';
import { searchSessions } from '../../store/sessions';
import { parent_variants, base_animations } from '../../constants/animations';
import { useState } from 'react';
import LoadingData from '../../components/shared/loading';
import './styles.scss';


function Search() {
    const [ tab, setTab ] = useState('sessions')
    const { query, sortBy, handleSort, handleInput } = useSearch()
    const { data: sessions, error: sessionsErr, isLoading: sessionsLoading } = useQuery(['sessions', query, sortBy], () => searchSessions(query, sortBy));
    const { data: teams, error: teamsErr, isLoading: teamsLoading } = useQuery(['teams', query, sortBy], () => searchTeams(query, sortBy));

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
            </div>
            </div>
                <header className='tab_header'>
                    <div className='float_left tabs'>
                        <p className={`tab bold ${tab === 'sessions' && 'active-tab'}`} onClick={() => setTab('sessions')}>Sessions</p>
                        <p className={`tab bold ${tab === 'teams' && 'active-tab'}`} onClick={() => setTab('teams')}>Teams</p>
                    </div>
                    <div className='float_right'>
                        <Sorter {...{ sortBy, tab, handleSort}} />
                    </div>
                </header>
                <Scroll>
                    <section className='section results'>
                        <span className='section_label xs bold'>
                            {tab === 'teams' ? teams?.length : sessions?.length} {tab}
                        </span>
                        {tab === 'teams' ?
                            <>
                                {
                                    teamsLoading ?
                                    <LoadingData /> :
                                    teamsErr ?
                                    <div>
                                        Error fetching teams
                                    </div> :
                                    <motion.ul
                                    variants={parent_variants}
                                    {...base_animations}
                                    className='result_list'>
                                        {teams?.map(team => (
                                            <TeamItem team={team} />
                                        ))}
                                    </motion.ul>
                                }
                            </>
                            :
                            <>
                                {
                                    sessionsLoading ?
                                    <LoadingData /> :
                                    sessionsErr ?
                                    <div>
                                        Error fetching sessions
                                    </div> :
                                    <motion.ul
                                        variants={parent_variants}
                                        {...base_animations}
                                        className='result_list'>
                                            {sessions?.map(session => (
                                                <SessionItem session={session} />
                                            ))}
                                    </motion.ul>
                                }
                            </>
                        }
                    </section>
                </Scroll>
        </motion.main>
    )
}

export default Search
