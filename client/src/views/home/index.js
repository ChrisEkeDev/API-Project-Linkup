import React, { useEffect } from 'react';
import MapWrapper from '../map';
import Slider from '../../components/slider'
import AppRouter from '../../routers/AppRouter';
import { useApp } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import './styles.scss';

function Home() {
    const { pathname } = useLocation();
    const { navigate } = useApp();

    useEffect(() => {
        if (pathname === '/') {
            navigate('/search')
        }
    }, [])

    return (
        <main className='page home'>
            <section className='main'>
                <Slider
                    router={AppRouter}
                    map={MapWrapper}
                />
            </section>
        </main>
  )
}

export default Home
