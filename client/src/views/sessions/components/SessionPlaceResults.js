import React from 'react'
import { useApp } from '../../../context/AppContext';
import SessionPlaceResult from './SessionPlaceResult'
import { AnimatePresence } from 'framer-motion';

function SessionPlaceResults(props) {
    const { settings } = useApp();
    const settingsData = settings?.data;
    const { theme } = settingsData;
    const { queryResults, addressConfirmed, handleAddressObject } = props;

    return (
        <AnimatePresence>
            <div className='results_container'>
            <div className={`fade_overlay fade_overlay-${theme}`}></div>
            {
                queryResults?.length > 0 && !addressConfirmed ?
                <ul className='results_list'>

                    {queryResults.map((result, i) => (
                        <SessionPlaceResult key={i} result={result} onSelect={handleAddressObject}/>
                    ))}
                </ul> :
                null
            }
            </div>
        </AnimatePresence>
    )
}

export default SessionPlaceResults
