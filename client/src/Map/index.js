import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Loading from '../App/Loading';
import Map from './Map';
import './Styles.scss';

function MapWrapper() {

  const render = (status) => {
    switch(status) {
        case Status.LOADING: return <Loading/>;
        case Status.FAILURE: return <Redirect to="/error" />;
        case Status.SUCCESS: return <Map/>
    }
  }

  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      libraries={["marker", "places"]}
      render={render}
    />
  )
}

export default MapWrapper
