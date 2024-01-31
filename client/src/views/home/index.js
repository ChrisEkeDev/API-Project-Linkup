import React from 'react';
// import MapWrapper from '../map';
import Slider from '../../components/slider'
import NavigationBar from '../../components/navbar';
import './styles.scss';
import AppRouter from '../../routers/AppRouter';

function Home() {

    return (
        <main className='page home'>
            <section className='main'>
                <Slider
                    router={AppRouter}
                    // map={null}
                />
            </section>
        </main>
  )
}

export default Home
