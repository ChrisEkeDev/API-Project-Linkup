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
import PageWrapper from '../Shared/components/Layout/PageWrapper';
import SectionHeader from '../Shared/components/Layout/SectionHeader';
import PageSection from '../Shared/components/Layout/PageSection';

function SessionsMain() {

  const { navigate } = useApp();
  const player = useSelector(state => state.auth.player);

  return (

    <PageWrapper>
      <SectionHeader>
        <h2 className='page--title'>Results</h2>
        <div className='page--actions'>
          <SessionsSort/>
          <Button
            styles='primary page--button'
            label={player ? "New" : "Sign in to create a session"}
            icon={TbPlus}
            action={player ? () => navigate('/new-session') : () => navigate('/sign-in')}
          />
        </div>
      </SectionHeader>
      <PageSection>
        <SessionsList />
      </PageSection>
    </PageWrapper>
  )
}

export default SessionsMain
