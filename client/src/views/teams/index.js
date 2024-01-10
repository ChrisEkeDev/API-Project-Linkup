import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './styles.scss';
import TeamItem from './components/TeamItem';
import * as ROUTE from '../../constants/routes';
// import TeamsSorter from './components/SessionSorter';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import useTeamSearch from './hooks/useTeamSearch';
import Scroll from '../../components/shared/scroll';
import { page_transitions } from '../../constants/animations';
import { PiPlusBold, PiMagnifyingGlassBold } from 'react-icons/pi';


function SearchTeams() {
  const teams = useSelector(state => state.teams.myTeams);
  const { navigate } = useApp();

  return (
      <motion.main {...page_transitions} className='page teams'>
        <header className='page_header'>
          <h2>My Teams</h2>
          <Button
              label="Create New Team"
              styles="primary"
              icon={PiPlusBold}
              action={() => navigate('/teams/new')}
          />
        </header>
        <Scroll>
          <section className='list_items'>
            <span className='section_label xs bold'>{teams.length} Team{teams.length === 1 ? null : 's'}</span>
            <ul>
              {
                teams.map(team => (
                  <TeamItem team={team}/>
                ))
              }
            </ul>
          </section>
        </Scroll>
      </motion.main>
  )
}

export default SearchTeams
