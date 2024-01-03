import React from 'react';
import { motion } from 'framer-motion';
import useNewSession from './hooks/useNewSession';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import { TbCalendar, TbClock, TbGauge, TbMapPinCheck, TbMapPinQuestion, TbMapPin, TbCalendarPlus } from 'react-icons/tb';
import { CgSpinner } from 'react-icons/cg';
import { page_transitions } from '../../constants/animations';



function NewSession() {
  const {
    sessionData,
    addressObject,
    errors,
    handleInput,
    status,
    verifyAddress,
    createSession
  } = useNewSession();


  return (
    <motion.main {...page_transitions} className='page new_session'>
        <header className='header'>
            <Back/>
        </header>
        <form className='session_form'>
          <header className='form_header'>
            <h2>Create New Session</h2>
          </header>
          <Input
            label="Name"
            placeholder='Hoops at the Parks'
            value={sessionData?.name}
            setValue={handleInput}
            name='name'
            error={errors?.name}
            disabled={false}
          />
          <div className='form_input'>
            <Input
              label="Full Address"
              placeholder='123 Fake St, City, ST'
              value={sessionData?.address}
              setValue={handleInput}
              name='address'
              error={errors?.address}
              disabled={false}
            />
            <Button
              label={
                status === "loading" ? "Verifying..."
                : status === "success" ? "Address Verified"
                : "Verify Address"
              }
              styles={`input_button ${
                status === "loading" ? "reply"
                : status === "success" ? "success"
                : "tertiary"
              }`}
              icon={
                  status === "loading" ? CgSpinner :
                  status === "success" ? TbMapPinCheck  :
                  TbMapPinQuestion
              }
              action={verifyAddress}
            />
          </div>
          {
            Object.keys(addressObject).length && status === "success" ?
            <div className='form_verification'>
              <TbMapPin className="icon"/>
              <div className='details'>
                <small>Verified Address</small>
                <p className='time'>{addressObject.address}</p>
              </div>
            </div> :
            null
          }
          <div className='form_flex'>
            <Input
              label="Date"
              name="date"
              type="date"
              iconRight={<TbCalendar className='input_icon'/>}
              value={sessionData?.date}
              setValue={handleInput}
              error={errors?.date}
              disabled={false}
            />
            <Input
              label="Time"
              name="time"
              type="time"
              iconRight={<TbClock className='input_icon'/>}
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
              iconRight={<TbGauge className='input_icon'/>}
              value={sessionData?.duration}
              setValue={handleInput}
              error={errors?.duration}
              disabled={false}
            />
          </div>
          <footer className='form_actions'>
            <Button
              label="Create Session"
              styles="primary"
              icon={TbCalendarPlus}
              action={createSession}
            />
          </footer>
        </form>
    </motion.main>
  )
}

export default NewSession
