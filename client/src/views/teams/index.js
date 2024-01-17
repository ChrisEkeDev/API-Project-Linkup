import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import './styles.scss';
import TeamItem from './components/TeamItem';
import * as ROUTE from '../../constants/routes';
import Button from '../../components/shared/button';
import IconButton from '../../components/shared/button/IconButton';
import useTeams from './hooks/useTeams'
import { useApp } from '../../context/AppContext';
import useTeamSearch from './hooks/useTeamSearch';
import Scroll from '../../components/shared/scroll';
import { statusOrder } from '../../constants/constants'
import { page_transitions } from '../../constants/animations';
import { PiPlusBold, PiMagnifyingGlassBold, PiCoffee } from 'react-icons/pi';
import LoadingData from '../../components/shared/loading'


function Teams() {
  const myTeams = useSelector(state => state.teams.myTeams);
  const myTeamsArr = Object.values(myTeams)
  const myMemberships = useSelector(state => state.memberships.myMemberships)
  const myMembershipsArr = Object.values(myMemberships)
  const hostTeams = myMembershipsArr.filter(membership => membership.status === 'host')
  const joinedTeams = myMembershipsArr.filter(membership => membership.status !== 'host' && membership.status !== 'pending');
  const pendingTeams = myMembershipsArr.filter(membership => membership.status === 'pending');
  const { navigate, dispatch } = useApp();
  const { loading } = useTeams();


  if (loading) return <LoadingData/>

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
            <span className='section_label xs bold'>{myTeamsArr.length} Team{myTeamsArr.length === 1 ? null : 's'} Created</span>
            {hostTeams.length > 0 ?
              <ul>
              {
                hostTeams.map(membership => (
                  <TeamItem team={membership.Team}/>
                ))
              }
            </ul> :
            <div className="no_content">
              <PiCoffee className='icon'/>
              <p className='sm bold'>No Teams Created</p>
            </div>
            }
          </section>
          <section className='joined_groups list_items'>
            <span className='section_label xs bold'>{joinedTeams.length} Team{joinedTeams.length === 1 ? null : 's'} Joined</span>
            {
              joinedTeams.length > 0 ?
              <ul>
                {
                  joinedTeams.map(membership => (
                    <TeamItem team={membership.Team}/>
                  ))
                }
              </ul> :
              <div className="no_content">
                <PiCoffee className='icon'/>
                <p className='sm bold'>No Teams Joined</p>
              </div>
            }
          </section>
          <section className='joined_groups list_items'>
            <span className='section_label xs bold'>{pendingTeams.length} Team{pendingTeams.length === 1 ? null : 's'} Awaiting Approval</span>
            {
              pendingTeams.length > 0 ?
              <ul>
                {
                  pendingTeams.map(membership => (
                    <TeamItem team={membership.Team}/>
                  ))
                }
              </ul> :
              <div className="no_content">
                <PiCoffee className='icon'/>
                <p className='sm bold'>No Teams Awaiting Approval</p>
              </div>
            }
          </section>
        </Scroll>
      </motion.main>
  )
}

export default Teams
