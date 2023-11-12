import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../Shared/components/IconButton';
import { useApp } from '../App/Context/AppContext';
import { TbArrowDown, TbArrowLeft, TbArrowUp, TbSearch } from 'react-icons/tb';
import './Styles.scss';
import { thunkGetAllSessions } from '../Store/sessions';
import SessionItem from './SessionItem';


function Sessions() {
    const { theme, handleAlerts } = useApp();
    const dispatch = useDispatch();
    const sessionsData = useSelector(state => state.sessions.allSessions);
    const sessions = Object.values(sessionsData);
    const [expanded, setExpanded ] = useState(false);
    const handleExpand = () => {
      console.log(expanded)
      setExpanded(!expanded)
    }


    useEffect(() => {
      const getSessions = async() => {
        try {
          await dispatch(thunkGetAllSessions())
        } catch(error) {
          handleAlerts({
            status: 'fail',
            title: 'Connection Issue',
            message: 'There was a problem getting the sessions.'
          })
          console.error(error)
        }
      }
      getSessions()
    }, [dispatch])

  return (
    <section className={`sessions_wrapper sessions_wrapper--${expanded ? 'expanded' : 'collapsed' } ${theme}-theme`}>
        <div className='sessions_contents'>
          <header onClick={ expanded ? null : handleExpand } className='sessions_header'>
            <h5>{expanded ? 'Showing courts near you' : 'Click to view courts near you'}</h5>
            <IconButton
              icon={expanded ? TbArrowDown : TbArrowUp }
              action={handleExpand}
            />
          </header>
            {/* <div onClick={handleExpand} className='sessions_toggle'>
            {expanded
                ? null
                : <IconButton icon={TbSearch}/>
            }
            </div>
            { expanded ?
              <>
                <header className='sessions_header'>
                  <div className='sessions_search'>
                    <input className='sessions_search_input'/>
                    <TbSearch className='sessions_search_icon'/>
                  </div>
                </header>
                <section>
                  <div className='sessions_search'>
                    <h5>Sort</h5>
                    <select className='sessions_search_input'>
                      <option>Number of Players</option>
                    </select>
                    <TbSearch className='sessions_search_icon'/>
                  </div>
                </section>
                <ul className='sessions_list'>
                    {sessions.map(session => (
                      <SessionItem session={session} key={session.id}/>
                    ))}
                </ul>
              </>
              : null
            } */}
        </div>
    </section>
  )
}

export default Sessions
