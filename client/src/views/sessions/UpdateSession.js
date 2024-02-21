import React from 'react';
import Back from '../../components/shared/button/Back';
import Form from '../../components/shared/layout/Form';
import { useParams } from 'react-router-dom';
import Scroll from '../../components/shared/scroll'
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import { TbMapPin, TbCalendar, TbClock, TbDirection, TbCalendarCheck, TbTrash } from 'react-icons/tb';
import LoadingData from '../../components/shared/loading';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import SessionHosts from './components/SessionHosts';
import Modal from '../../components/shared/modal';
import useModal from '../../hooks/useModal';
import DeleteSessionModal from './components/DeleteSessionModal'
import { getSession } from '../../store/sessions';
import { useQuery } from 'react-query';
import useSession from './hooks/useSession';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

function UpdateSession({session}) {
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const  {
        sessionData,
        errors,
        handleInput,
        handleHost,
        handleToggle,
        updateSessionLoading,
        onUpdateSession,
        onDeleteSession
    } = useSession({session});

    if ( updateSessionLoading ) return <LoadingData />

    return (
        <PageContainer>
           <PageHeader>
            <header className='flaot_full'>
                    <Back />
                    <Button
                        label="Update Session"
                        styles="primary"
                        icon={TbCalendarCheck}
                        action={onUpdateSession}
                        disabled={Object.keys(errors).length > 0}
                    />
                </header>
            </PageHeader>
            <Scroll>
                <Form title='Update Session'>
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
                        <TbMapPin className="icon"/>
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
                    <footer className='form_caution'>
                        <Button
                            label="Delete Session"
                            styles="tertiary"
                            icon={TbTrash}
                            action={onOpenModal}
                        />
                    </footer>
                </Form>
            </Scroll>
            <Modal
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
            >
                <DeleteSessionModal
                    deleteSession={onDeleteSession}
                    close={onCloseModal}
                />
            </Modal>
        </PageContainer>

    )
}

function UpdateSessionWrapper() {
    const { id } = useParams();
    const { data: session, error: sessionErr, isLoading: sessionLoading } = useQuery(['session', id], () => getSession(id));
    if ( sessionLoading ) return <LoadingData />
    const sessionData = session?.data;
    return <UpdateSession session={sessionData}/>
}





export default UpdateSessionWrapper
