import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer'
import { Link, useHistory } from 'react-router-dom';
import home from '../../assets/home-img.svg';
import join from '../../assets/join-img.svg';
import find from '../../assets/find-img.svg';
import start from '../../assets/start-img.svg';
import './Landing.css';
import Button from '../Buttons/Button';

function Landing({setAuthForm}) {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const navigate = (route) => {
        history.push(route)
    }

  return (
    <main id='landing-wrapper'>
        <section className='landing-contents'>
            <header className='landing-header'>
                <div className='landing-copy'>
                    <h1 className='display'>The people platform--<br/> Where interests<br/> become friendships</h1>
                    <p className='body'>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Linkup. Events are happening every day—sign up to join the fun.</p>
                </div>
                <img src={home} className='landing-image'/>
            </header>
            <section className='landing_hiw-wrapper'>
                <header className='landing_hiw-header'>
                    <h2 className='subheading'>How Linkup works</h2>
                    <p className='body'>Link up with new people who share your interests through online and in-person events. It’s free to create an account.</p>
                </header>
                <div className='landing_how-articles'>
                    <article className='landing_hiw-article'>
                        <img src={join} className='landing_hiw-image'/>
                        <Link className='body landing-link' to='/search/groups'>See all groups</Link>
                        <p className='body'>Do what you love, link up with others who love it, find your community. The rest is history!</p>
                    </article>
                    <article className='landing_hiw-article'>
                        <img src={find} className='landing_hiw-image'/>
                        <Link className='body landing-link' to='/search/events'>Find an event</Link>
                        <p className='body'>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
                    </article>
                    <article className='landing_hiw-article'>
                        <img src={start} className='landing_hiw-image'/>
                        <Link className={`body ${!user ? 'disabled-link' : 'landing-link'}`} to='/create-group'>Start a new group</Link>
                        <p className='body'>You don’t have to be an expert to gather people together and explore shared interests.</p>
                    </article>
                </div>
                <Button
                    label='Join Linkup'
                    type='secondary'
                    style='small-btn'
                    action={user ? () => navigate('/dashboard') : () => setAuthForm('signup')}
                />
            </section>
        </section>
        <Footer/>
    </main>
  )
}

export default Landing
