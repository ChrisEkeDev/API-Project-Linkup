import React, { useState, useEffect } from 'react';
import Back from '../../components/shared/button/Back';
import { AnimatePresence, motion } from 'framer-motion';
import { page_transitions } from '../../constants/animations';
import { useParams } from 'react-router-dom';
import Scroll from '../../components/shared/scroll'
import useUpdateSession from './hooks/useUpdateSession';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import { PiTrashBold, PiWarningBold, PiMagnifyingGlassBold, PiMapPinBold, PiCalendarBold, PiClockBold, PiCalendarPlusBold, PiCaretUpDownBold   } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { useApp } from '../../context/AppContext';
import LoadingData from '../../components/shared/loading';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import SessionHosts from './components/SessionHosts';
import Modal from '../../components/shared/modal';
import useModal from '../../hooks/useModal';
import DeleteSessionModal from './components/DeleteSessionModal'

function UpdateSession({session}) {
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const teamMemberships = useSelector(state => state.memberships.myMemberships);
    const teamMembershipsArr = Object.values(teamMemberships)
    const teamsWithAuth = teamMembershipsArr.filter(membership => membership.status === 'host' || membership.status === 'co-host');

    const  {
        sessionData,
        errors,
        handleInput,
        handleToggle,
        handleHost,
        updateSession,
    } = useUpdateSession(session);

  return (
        <motion.main {...page_transitions} className='page sessions'>
            <header className='header'>
                <Back />
                <Button
                    label="Update Session"
                    styles="primary"
                    icon={PiCalendarBold}
                    action={updateSession}
                />
            </header>
            <Scroll>
                <form className='session_form'>
                    {
                        sessionData &&
                        <>
                        <header className='form_header'>
                            <h2>Update Session</h2>
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
                        <div className='form_verification'>
                            <PiMapPinBold className="icon"/>
                            <div className='details'>
                                <p className='xs bold'>Address</p>
                                <p className='sm'>{session.address}</p>
                            </div>
                        </div>
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
                        <SessionHosts teams={teamsWithAuth} handleHost={handleHost} sessionData={sessionData} />
                        <footer className='form_caution'>
                            <Button
                                label="Delete Session"
                                styles="tertiary"
                                icon={PiTrashBold}
                                action={onOpenModal}
                            />
                        </footer>
                        </>
                    }
                </form>
            </Scroll>
            <Modal
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
            >
                <DeleteSessionModal
                    close={onCloseModal}
                />
            </Modal>
        </motion.main>
  )
}






export default UpdateSession
