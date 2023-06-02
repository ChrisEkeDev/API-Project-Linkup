import React from 'react';
import { Link } from 'react-router-dom'
import EventItem from '../events/eventItem';
import './Group.css';
import { FaAngleLeft } from 'react-icons/fa';

function Group() {
    const events = ['past', 'past', 'future', 'future', 'future', 'future', 'past', 'future']
  return (
    <main className='group-wrapper'>
        <header className='group_header-wrapper'>
            <div className='group_header-contents'>
                <Link className='group-back' to='/search/groups'>
                    <FaAngleLeft className='back-icon'/>
                    Groups
                </Link>
                <div className='group-contents'>
                    <div className='group-image'></div>
                    <div className='group_details-wrapper'>
                        <div className='group_details-contents'>
                            <h1 className='heading'>Group Name</h1>
                            <small className='body small'>Location</small>
                            <small className='body small'>## of events<span> &#8729; </span>Public</small>
                            <small className='body small'>Organized by Firstname Lastname</small>
                        </div>
                        <button className='group-button'>Join this group</button>
                    </div>
                </div>
            </div>
        </header>
        <section className='group_section-wrapper'>
            <div className='group_section-contents'>
                <header className='group_section-header'>
                    <h2 className='subheading'>Organizer</h2>
                    <p className='body'>First Name Last name</p>
                </header>
                <article className='group_section-about'>
                    <h2 className='subheading'>What we're about</h2>
                    <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi scelerisque eu ultrices vitae auctor eu. Donec ac odio tempor orci. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Potenti nullam ac tortor vitae purus faucibus ornare. Consectetur adipiscing elit ut aliquam purus sit amet. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Volutpat sed cras ornare arcu. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Sem nulla pharetra diam sit amet nisl suscipit.

Accumsan tortor posuere ac ut consequat semper viverra. Amet nulla facilisi morbi tempus. Lectus arcu bibendum at varius vel pharetra. Morbi quis commodo odio aenean sed adipiscing diam donec. Diam phasellus vestibulum lorem sed. Semper viverra nam libero justo. Justo nec ultrices dui sapien. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Eget mi proin sed libero enim sed faucibus. Ut sem viverra aliquet eget sit amet tellus cras.</p>
                </article>
                <article className='group_section-events_calendar'>
                    <section className='group_section-events'>
                        {
                           events.filter(e=>e==='future').length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Upcoming Events ({events.filter(e=>e==='future').length})</h2>
                            <ul>
                                {events.filter(e=>e==='future').map(e => {
                                        return (
                                            <li><EventItem contained={true} /></li>
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                        {
                           events.filter(e=>e==='past').length ?
                           <div className='group_section-event_list'>
                            <h2 className='subheading'>Past events ({events.filter(e=>e==='past').length})</h2>
                            <ul>
                                {events.filter(e=>e ==='past').map(e => {
                                        return (
                                            <li><EventItem contained={true} /></li>
                                        )
                                })}
                           </ul>
                           </div>:
                           null
                        }
                    </section>
                    <aside className='group_section-calendar'>

                    </aside>
                </article>
            </div>
        </section>
    </main>
  )
}

export default Group
