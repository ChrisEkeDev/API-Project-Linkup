import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Landing.css';
import Button from '../Buttons/Button';

function Landing({setAuthForm}) {
    const user = useSelector(state => state.session.user);
  return (
    <main id='landing-wrapper'>
        <section className='landing-contents'>
            <header className='landing-header'>
                <div className='landing-copy'>
                    <h1 className='display'>The people platform--<br/> Where interests<br/> become friendships</h1>
                    <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className='landing-image'>

                </div>
            </header>
            <section className='landing_hiw-wrapper'>
                <header className='landing_hiw-header'>
                    <h2 className='subheading'>How Linkup works</h2>
                    <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </header>
                <div className='landing_how-articles'>
                    <article className='landing_hiw-article'>
                        <div className='landing_hiw-image'></div>
                        <Link className='body landing-link' to='/search/groups'>See all groups</Link>
                        <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.</p>
                    </article>
                    <article className='landing_hiw-article'>
                        <div className='landing_hiw-image'></div>
                        <Link className='body landing-link' to='/search/events'>Find an event</Link>
                        <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.</p>
                    </article>
                    <article className='landing_hiw-article'>
                        <div className='landing_hiw-image'></div>
                        <Link className={`body ${!user ? 'disabled-link' : 'landing-link'}`} to='/group/new'>Start a new group</Link>
                        <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.</p>
                    </article>
                </div>
                <Button
                    label='Join Linkup'
                    type='secondary'
                    action={() => setAuthForm('signup')}
                />
            </section>
        </section>
    </main>
  )
}

export default Landing
