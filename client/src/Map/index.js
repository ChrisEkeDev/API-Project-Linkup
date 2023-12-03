import React, { useState } from 'react';
import MapError from './MapError';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Loading from '../App/Loading';
import Map from './Map';
import './Styles.scss';

function MapWrapper() {

  const render = (status) => {
    switch(status) {
        case Status.LOADING: return <Loading/>; break;
        case Status.FAILURE: return <MapError />; break;
        case Status.SUCCESS: return <Map/>; break;
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
