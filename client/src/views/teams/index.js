import './styles.scss';
import TeamItem from './components/TeamItem';
import Button from '../../components/shared/button';
import { useApp } from '../../context/AppContext';
import Scroll from '../../components/shared/scroll';
import List from '../../components/shared/layout/List'
import { TbCirclePlus, TbHelpSmall, TbUsersGroup  } from 'react-icons/tb';
import LoadingData from '../../components/shared/loading'
import { useQuery } from 'react-query';
import { getMyTeams } from '../../store/auth';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';
import SectionContainer from '../../components/shared/layout/SectionContainer';
import NoContent from '../../components/shared/noContent';


function Teams() {
  const { navigate } = useApp();
  const { data: teams, error: teamsErr, isLoading: teamsLoading} = useQuery('my-teams', getMyTeams);

  if (teamsLoading) return <LoadingData/>
  if (teamsErr) return <div>Error getting your teams</div>

  const teamsData = teams.data;
  const teamsCaptain = teamsData.filter(team => team.Memberships[0].status === 'host');
  const teamsJoined = teamsData.filter(team => team.Memberships[0].status !== 'host' && team?.Memberships[0].status !== 'pending');
  const teamsPending = teamsData.filter(team => team.Memberships[0].status === 'pending');

  return (
    <PageContainer>
      <PageHeader>
        <header className='float_full'>
          <h2>My Teams</h2>
          <Button
              label="Create New Team"
              styles="primary"
              icon={TbCirclePlus}
              action={() => navigate('/teams/new')}
          />
        </header>
      </PageHeader>
      <Scroll>
        {
          teamsCaptain.length > 0 ?
          <SectionContainer title={`${teamsCaptain.length} Team${teamsCaptain.length === 1 ? '' : 's'} Created`}>
            <List>
              {
                teamsCaptain.map(team => (
                  <TeamItem key={team.id} team={team}/>
                ))
              }
            </List>
          </SectionContainer>
          :
          <NoContent
              icon={TbUsersGroup}
              message="You haven't created any teams yet."
          />
        }
        {
          teamsJoined.length > 0 ?
          <SectionContainer title={`${teamsJoined.length} Team${teamsJoined.length === 1 ? '' : 's'} Joined`}>
            <List>
              {
                teamsJoined.map(team => (
                  <TeamItem key={team.id}  team={team}/>
                ))
              }
            </List>
          </SectionContainer>
          :
          <NoContent
              icon={TbUsersGroup}
              message="You haven't joined any teams yet."
          />
        }
        {
          teamsPending.length > 0 ?
          <SectionContainer title={`${teamsPending.length} Team${teamsPending.length === 1 ? '' : 's'} Awaiting Approval`}>
            <List>
              {
                teamsPending.map(team => (
                  <TeamItem key={team.id}  team={team}/>
                ))
              }
            </List>
          </SectionContainer>
          :
          <NoContent
              icon={TbUsersGroup}
              message="You haven't requested to join any sessions yet."
          />
        }
      </Scroll>
    </PageContainer>
  )
}

export default Teams
