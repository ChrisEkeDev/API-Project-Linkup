import React from 'react';
import SessionsSort from '../Sort';
import SessionsList from './SessionsList';
import "./Styles.scss";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sortValues } from '../Shared/constants/predefinedValues';
import Button from '../Shared/components/Button'
import { TbPlus } from 'react-icons/tb';
import { useApp } from '../App/Context/AppContext';


function SessionsMain() {

  const { navigate } = useApp();
  const player = useSelector(state => state.auth.player);

  return (
    <div className='sessions__main--wrapper'>
      {

      }
      <header className='sessions__results_header--wrapper'>
            <section className='sessions__results_header--contents'>
                <span  className='sessions__results_header--title' >Results</span>
                <div className='sessions__results_header--options'>
                    {/* <SessionsFilter/> */}
                    <SessionsSort/>
                    <Button
                        style='sessions__results_header--button'
                        type="primary"
                        label={player ? "New" : "Sign in to create a session"}
                        icon={TbPlus}
                        action={player ? () => navigate('/new-session') : () => navigate('/sign-in')}
                    />
                </div>
            </section>
        </header>
        <SessionsList />
    </div>
  )
}

export default SessionsMain
