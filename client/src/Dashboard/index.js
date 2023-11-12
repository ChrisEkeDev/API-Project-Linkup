import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Styles.scss';
import MapWrapper from '../Map';
import Navigation from '../Navigation';
import Sessions from '../Sessions'


function Dashboard() {

  return (
    <main className='dashboard_wrapper'>
        <Navigation />
        <MapWrapper />
        <Sessions />
    </main>
  )
}

export default Dashboard
