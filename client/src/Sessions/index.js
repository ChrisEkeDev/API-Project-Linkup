import { useApp } from '../App/Context/AppContext';
import './Styles.scss';
import { Switch, Route } from 'react-router-dom';
import SessionsOptions from './SessionsOptions';
import SessionsList from './SessionsList';
import useGetSessions from './hooks/useGetSessions';
import SessionPage from './SessionPage';
import DataLoading from '../App/Loading/DataLoading';
import CreateNewSession from './CreateNewSession';
import SessionsMain from './SessionsMain';
import EditSession from './EditSession';


function Sessions() {
  const { theme } = useApp();
  const [ data, loading ] = useGetSessions();

  if (loading) return <DataLoading/>
  if (data === false) return <div>Not Found</div>

  return (
    <section className={`sessions_wrapper ${theme}-theme`}>
      <div className='sessions_contents'>
      <Switch>
        <Route exact path='/'><SessionsMain /></Route>
        <Route exapt path="/new-session"><CreateNewSession /></Route>
        <Route exact path='/sessions/:id'><SessionPage /></Route>
        <Route exact path='/sessions/:id/update'><EditSession /></Route>
      </Switch>
      </div>
    </section>
  )
}

export default Sessions
