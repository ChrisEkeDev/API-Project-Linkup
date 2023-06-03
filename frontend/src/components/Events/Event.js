import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaRegClock, FaMapPin, FaDollarSign, FaAngleLeft } from 'react-icons/fa';
import './Event.css';

function Event() {
  const history = useHistory();

  const navigate = (route) => {
    history.push(route)
  }

  return (
    <main className='event-wrapper'>
        <header className='event_header-wrapper'>
          <div className='event_header-contents'>
            <Link className='group-back' to='/search/events'>
              <FaAngleLeft className='back-icon'/>
              Events
            </Link>
            <h1 className='heading'>Event Name</h1>
            <p className='body small'>Hosted by First Name Last Name</p>
          </div>
        </header>
        <section className='event_section-wrapper' >
          <div className='event_section-contents' >
            <div className='event_section-information' >
              <div className='event_section-image'></div>
              <aside className='event_section-aside'>
                  <div onClick={() => navigate('/groups/1')} className='event_section-group'>
                    <div className='event_section-group_image'></div>
                    <div className='event_section-group_info'>
                      <p className='body bold'>Group Name with word wrapping as Needed</p>
                      <p className='body small'>Public</p>
                    </div>
                  </div>
                  <div className='event_section-details'>
                    <div className='event_section-details_item'>
                      <FaRegClock className='icon'/>
                      <p className='small'>START {'YYYY-MM-DD'} &#8729; {'Time'}<br/>END {'YYYY-MM-DD'} &#8729; {'Time'}</p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaDollarSign className='icon'/>
                      <p className='small'>FREE</p>
                    </div>
                    <div className='event_section-details_item'>
                      <FaMapPin className='icon'/>
                      <p className='small'>In Person</p>
                    </div>
                  </div>
              </aside>
            </div>
            <h2 className='subheading'>Details</h2>
            <p className='body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue neque gravida in fermentum. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Nisi scelerisque eu ultrices vitae auctor eu. Donec ac odio tempor orci. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Potenti nullam ac tortor vitae purus faucibus ornare. Consectetur adipiscing elit ut aliquam purus sit amet. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Volutpat sed cras ornare arcu. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Sem nulla pharetra diam sit amet nisl suscipit.

  Accumsan tortor posuere ac ut consequat semper viverra. Amet nulla facilisi morbi tempus. Lectus arcu bibendum at varius vel pharetra. Morbi quis commodo odio aenean sed adipiscing diam donec. Diam phasellus vestibulum lorem sed. Semper viverra nam libero justo. Justo nec ultrices dui sapien. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Accumsan tortor posuere ac ut consequat semper viverra nam libero. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Eget mi proin sed libero enim sed faucibus. Ut sem viverra aliquet eget sit amet tellus cras.</p>
          </div>
        </section>
    </main>
  )
}

export default Event
