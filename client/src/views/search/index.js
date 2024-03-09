import { motion } from 'framer-motion'
import TeamItem from '../teams/components/TeamItem';
import SessionItem from '../../views/sessions/components/SessionItem';
import List from '../../components/shared/layout/List'
import Sorter from './components/Sorter';
import { useApp } from '../../context/AppContext';
import useSearch from './hooks/useSearch';
import Scroll from '../../components/shared/scroll';
import { useQuery } from 'react-query';
import { searchTeams } from '../../store/teams';
import { searchSessions } from '../../store/sessions';
import { useState } from 'react';
import LoadingData from '../../components/shared/loading';
import './styles.scss';
import SectionContainer from '../../components/shared/layout/SectionContainer';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';


function Search() {
    const { theme } = useApp()
    const [ tab, setTab ] = useState('sessions')
    const { query, sortBy, handleSort, handleInput } = useSearch({tab})
    const { data: sessions, error: sessionsErr, isLoading: sessionsLoading } = useQuery(['sessions', query, sortBy], () => searchSessions(query, sortBy));
    const { data: teams, error: teamsErr, isLoading: teamsLoading } = useQuery(['teams', query, sortBy], () => searchTeams(query, sortBy));
    const sessionsData = sessions?.data;
    const teamsData = teams?.data;

    return (
        <PageContainer>
            <PageHeader>
                <div className='float_right flex_full'>
                    <input
                        value={query}
                        onChange={handleInput}
                        className={`search_input search_input-${theme}`}
                        placeholder="Search by name or address"
                    />
                </div>
                <header className='tab_header  flex_full'>
                    <div className='float_left tabs'>
                        <p className={`tab tab-${theme} bold ${tab === 'sessions' && 'active-tab'}`} onClick={() => setTab('sessions')}>Sessions</p>
                        <p className={`tab tab-${theme} bold ${tab === 'teams' && 'active-tab'}`} onClick={() => setTab('teams')}>Teams</p>
                    </div>
                    <div className='float_right'>
                        <Sorter {...{ sortBy, tab, handleSort}} />
                    </div>
                </header>
            </PageHeader>
            <Scroll>
                {tab === 'teams' ?
                    teamsLoading ?
                    <LoadingData /> :
                    teamsErr ?
                    <div>
                        Error fetching teams
                    </div> :
                    <SectionContainer flex title={`${teamsData?.length} Teams`}>
                        <List>
                            {teamsData?.map(team => (
                                <TeamItem key={team.id} team={team} />
                            ))}
                        </List>
                    </SectionContainer>
                    :
                    sessionsLoading ?
                    <LoadingData /> :
                    sessionsErr ?
                    <div>
                        Error fetching sessions
                    </div> :
                    <SectionContainer flex title={`${sessionsData?.length} Sessions`}>
                        <List>
                            {sessionsData?.map(session => (
                                <SessionItem key={session.id} session={session} />
                            ))}
                        </List>
                    </SectionContainer>
                }
            </Scroll>
        </PageContainer>
    )
}

export default Search
