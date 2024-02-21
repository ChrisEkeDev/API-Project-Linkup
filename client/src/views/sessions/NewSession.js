import React from 'react';
import useSession from './hooks/useSession';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll'
import { TbCheck, TbAlertCircle, TbSearch, TbMapPin, TbCalendar, TbClock, TbCalendarPlus, TbDirection } from 'react-icons/tb';
import { CgSpinner } from 'react-icons/cg';
import SessionPlaceResults from './components/SessionPlaceResults';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import SessionHosts from './components/SessionHosts';
import LoadingData from '../../components/shared/loading';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';
import Form from '../../components/shared/layout/Form';


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
  } = useSession({});

  if ( createSessionLoading) return <LoadingData />


  return (
    <PageContainer>
      <PageHeader>
        <header className='float_full'>
          <Back />
          <Button
            label="Create Session"
            styles="primary"
            icon={TbCalendarPlus}
            action={onCreateSession}
            disabled={Object.keys(errors).length > 0}
          />
        </header>
      </PageHeader>
      <Scroll>
        <Form title="Create New Session">
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
                : status === "success" && addressConfirmed ? "Success"
                : status === 'error' ? 'Try Again'
                : "Search"
              }
              styles={`input_button ${
                status === "loading" ? "reply"
                : status === "success" ? "tertiary"
                : status === 'error' ? 'warning'
                : "tertiary"
              }`}
              icon={
                  status === "loading" ? CgSpinner
                  : status === "success" && addressConfirmed ? TbCheck
                  : status === "error" ? TbAlertCircle
                  : TbSearch
              }
              loading={ status === "loading" }
              action={ onGetPlaces }
            />
          </div>
          <SessionPlaceResults { ...{ queryResults, addressConfirmed, handleAddressObject } } />
          {
            addressObject ?
            <div className='form_verification'>
              <TbMapPin className="icon"/>
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
              iconRight={<TbDirection className='input_icon'/>}
              value={sessionData?.duration}
              setValue={handleInput}
              error={errors?.duration}
              disabled={false}
            />
          </div>
          <PrivacyToggle data={sessionData} handleToggle={handleToggle} />
          <SessionHosts handleHost={handleHost} sessionData={sessionData} />
        </Form>
      </Scroll>
    </PageContainer>
  )
}

export default NewSession
