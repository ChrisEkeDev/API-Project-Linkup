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

  console.log(teams)

  const teamsCaptain = teams.filter(team => team.Memberships[0].status === 'host');
  const teamsJoined = teams.filter(team => team.Memberships[0].status !== 'host' && team?.Memberships[0].status !== 'pending');
  const teamsPending = teams.filter(team => team.Memberships[0].status === 'pending');

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
          <section className='list_items'>
            <span className='section_label xs bold'>{teamsCaptain.length} Team{teamsCaptain.length === 1 ? null : 's'} Created</span>
            {teamsCaptain.length > 0 ?
              <ul>
              {
                teamsCaptain.map(team => (
                  <TeamItem team={team}/>
                ))
              }
            </ul> :
            <div className="no_content">
              <TbError404  className='icon'/>
              <p className='sm bold'>No Teams Created</p>
            </div>
            }
          </section>
          <section className='joined_groups list_items'>
            <span className='section_label xs bold'>{teamsJoined.length} Team{teamsJoined.length === 1 ? null : 's'} Joined</span>
            {
              teamsJoined.length > 0 ?
              <ul>
                {
                  teamsJoined.map(team => (
                    <TeamItem team={team}/>
                  ))
                }
              </ul> :
              <div className="no_content">
                <TbError404  className='icon'/>
                <p className='sm bold'>No Teams Joined</p>
              </div>
            }
          </section>
          <section className='joined_groups list_items'>
            <span className='section_label xs bold'>{teamsPending.length} Team{teamsPending.length === 1 ? null : 's'} Awaiting Approval</span>
            {
              teamsPending.length > 0 ?
              <ul>
                {
                  teamsPending.map(team => (
                    <TeamItem team={team}/>
                  ))
                }
              </ul> :
              <div className="no_content">
                <TbError404  className='icon'/>
                <p className='sm bold'>No Teams Awaiting Approval</p>
              </div>
            }
          </section>
        </Scroll>
      </motion.main>
  )
}

export default Teams
