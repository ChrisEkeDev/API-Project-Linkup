import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNewSession from './hooks/useNewSession';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll'
import { PiCheckCircleBold, PiWarningBold, PiMagnifyingGlassBold, PiMapPinBold, PiCalendarBold, PiClockBold, PiCalendarPlusBold, PiCaretUpDownBold   } from 'react-icons/pi';
import { CgSpinner } from 'react-icons/cg';
import { page_transitions } from '../../constants/animations';
import SessionPlaceResults from './components/SessionPlaceResults';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import SessionHosts from './components/SessionHosts';
import LoadingData from '../../components/shared/loading';


function NewSession() {


  const {
    sessionData,
    addressObject,
    handleAddressObject,
    addressConfirmed,
    queryResults,
    errors,
    status,
    handleInput,
    handleToggle,
    handleHost,
    onGetPlaces,
    createSessionLoading,
    onCreateSession,
  } = useNewSession();

  if ( createSessionLoading) return <LoadingData />


  return (
    <motion.main {...page_transitions} className='page sessions'>
        <header className='header'>
          <Back />
          <Button
            label="Create Session"
            styles="primary"
            icon={PiCalendarPlusBold}
            action={onCreateSession}
            disabled={Object.keys(errors).length > 0}
          />
        </header>
        <Scroll>
        <form className='session_form'>
          <header className='form_header'>
            <h2>Create New Session</h2>
          </header>
          <Input
            label="What will you call your session"
            placeholder='5 on 5 or Mini Tournament'
            value={sessionData?.name}
            setValue={handleInput}
            name='name'
            error={errors?.name}
            disabled={false}
          />
          <div className='form_input'>
            <Input
              label="Where will your session be?"
              placeholder='Gyms in Seattle or 123 Fake St, City, ST'
              value={sessionData?.address}
              setValue={handleInput}
              name='address'
              error={errors?.address}
              disabled={false}
            />
            <Button
              label={
                status === "loading" ? "Searching..."
                : status === "success" ? "Success"
                : status === 'fail' ? 'Try Again'
                : "Search"
              }
              styles={`input_button ${
                status === "loading" ? "reply"
                : status === "success" ? "tertiary"
                : status === 'fail' ? 'warning'
                : "tertiary"
              }`}
              icon={
                  status === "loading" ? CgSpinner
                  : status === "success" ? PiCheckCircleBold
                  : status === "fail" ? PiWarningBold
                  : PiMagnifyingGlassBold
              }
              loading={ status === "loading" }
              action={ onGetPlaces }
            />
          </div>
          <SessionPlaceResults { ...{ queryResults, addressConfirmed, handleAddressObject } } />
          {
            addressObject ?
            <div className='form_verification'>
              <PiMapPinBold className="icon"/>
              <div className='details'>
                <p className='xs bold'>Verified Address</p>
                <p className='sm'>{ addressObject.address }</p>
              </div>
            </div> :
            null
          }
          <div className='form_flex'>
            <Input
              label="Date"
              name="date"
              type="date"
              iconRight={<PiCalendarBold className='input_icon'/>}
              value={sessionData?.date}
              setValue={handleInput}
              error={errors?.date}
              disabled={false}
            />
            <Input
              label="Time"
              name="time"
              type="time"
              iconRight={<PiClockBold className='input_icon'/>}
              value={sessionData?.time}
              setValue={handleInput}
              error={errors?.time}
              disabled={false}
            />
            <Input
              label="Duration (hours)"
              name="duration"
              type="number"
              min={1}
              max={6}
              iconRight={<PiCaretUpDownBold className='input_icon'/>}
              value={sessionData?.duration}
              setValue={handleInput}
              error={errors?.duration}
              disabled={false}
            />
          </div>
          <PrivacyToggle data={sessionData} handleToggle={handleToggle} />
          <SessionHosts handleHost={handleHost} sessionData={sessionData} />
        </form>
        </Scroll>
    </motion.main>
  )
}

export default NewSession
