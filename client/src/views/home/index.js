import React from 'react';
import SessionsRouter from '../../routers/SessionsRouter';
import useSidePane from './hooks/useSidePane';
import IconButton from '../../components/shared/button/IconButton';
import { useApp } from '../../context/AppContext';
import MapWrapper from '../map';
import NavigationBar from '../../components/navbar';
import './styles.scss';
import { TbArrowLeft, TbArrowRight  } from 'react-icons/tb';
import { Redirect } from 'react-router-dom';

function Home() {
    const {
        sidePaneOpen,
        onToggleSidePane
    } = useSidePane();

    const { auth, navigate } = useApp();

    if (!auth) return <Redirect to='/sign-in'/>

    return (
        <main className='page home'>
            <NavigationBar />
            <section className='main'>
                <div className={`side_pane side_pane--${sidePaneOpen ? 'open' : 'closed'}`}>
                    <SessionsRouter/>
                    <IconButton
                        styles='side_pane-button'
                        action={onToggleSidePane}
                        icon={sidePaneOpen ? TbArrowLeft : TbArrowRight }
                    />

                </div>
                {/* <MapWrapper/> */}
            </section>
        </main>
  )
}

export default Home
