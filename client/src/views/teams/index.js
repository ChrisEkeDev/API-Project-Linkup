import { motion } from 'framer-motion';
import './styles.scss';
import TeamItem from './components/TeamItem';
import * as ROUTE from '../../constants/routes';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import Scroll from '../../components/shared/scroll';
import { page_transitions } from '../../constants/animations';
import { TbCirclePlus, TbError404  } from 'react-icons/tb';
import LoadingData from '../../components/shared/loading'
import { useQuery } from 'react-query';
import { getMyTeams } from '../../store/auth';


function Teams() {
  const { auth, navigate } = useApp();
  const { data: teams, error: teamsErr, isLoading: teamsLoading} = useQuery('my-teams', getMyTeams);

  if (teamsLoading) return <LoadingData/>
  if (teamsErr) return <div>Error getting your teams</div>

  const teamsData = teams.data;

  const teamsCaptain = teamsData.filter(team => team.Memberships[0].status === 'host');
  const teamsJoined = teamsData.filter(team => team.Memberships[0].status !== 'host' && team?.Memberships[0].status !== 'pending');
  const teamsPending = teamsData.filter(team => team.Memberships[0].status === 'pending');

  return (
      <motion.main {...page_transitions} className='page teams'>
        <header className='page_header'>
          <h2>My Teams</h2>
          <Button
              label="Create New Team"
              styles="primary"
              icon={TbCirclePlus}
              action={() => navigate('/teams/new')}
          />
        </header>
        <Scroll>
          {
            teamsCaptain.length > 0 ?
            <section className='list_items'>
              <span className='section_label xs bold'>{teamsCaptain.length} Team{teamsCaptain.length === 1 ? null : 's'} Created</span>
              <ul>
                {
                  teamsCaptain.map(team => (
                    <TeamItem key={team.id} team={team}/>
                  ))
                }
              </ul>
            </section>
            : null
          }
          {
            teamsJoined.length > 0 ?
            <section className='joined_groups list_items'>
              <span className='section_label xs bold'>{teamsJoined.length} Team{teamsJoined.length === 1 ? null : 's'} Joined</span>
              <ul>
                {
                  teamsJoined.map(team => (
                    <TeamItem key={team.id}  team={team}/>
                  ))
                }
              </ul>
            </section>
            : null
          }
          {
            teamsPending.length > 0 ?
            <section className='joined_groups list_items'>
              <span className='section_label xs bold'>{teamsPending.length} Team{teamsPending.length === 1 ? null : 's'} Awaiting Approval</span>
              <ul>
                {
                  teamsPending.map(team => (
                    <TeamItem key={team.id}  team={team}/>
                  ))
                }
              </ul>
            </section>
            : null
          }
        </Scroll>
      </motion.main>
  )
}

export default Teams
