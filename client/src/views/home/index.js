import React, { useEffect } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import logo from '../../assets/backcourts-logo.svg'
import PageContainer from '../../components/shared/layout/PageContainer';
import './styles.scss';

function Home() {

    return (
        <PageContainer>
            <div className='home_container'>
                <div className='home_tip'>
                    <TbArrowLeft/>
                    <span className='sm bold accent'>Start here</span>
                </div>
                <img src={logo} alt="logo" className='home_logo'/>
                <h1 className='home_title xl'>Welcome to Backcourts</h1>
                <p className='home_body sm'>
                Please note that Backcourts is currently a work in progress and has
                been made available solely to showcase my development skills. While
                the app is fully functional, there may be ongoing improvements and
                updates as I continue to refine its features and functionality.
                <br/><br/>
                Backcourts is designed to bring basketball enthusiasts together by
                providing a platform to search for and post public and private pickup
                games, engage in live chat discussions, and efficiently manage teams
                and game sessions.
                <br/><br/>
                Your feedback and suggestions are invaluable in shaping the future
                of Backcourts. Feel free to explore the app and provide any comments
                or ideas you may have to enhance the user experience.
                </p>
            </div>
        </PageContainer>
  )
}

export default Home
