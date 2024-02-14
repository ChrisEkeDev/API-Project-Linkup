import React from 'react';
import { getTeam } from '../../store/teams';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import useTeam from './hooks/useTeam';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import Modal from '../../components/shared/modal';
import useModal from '../../hooks/useModal';
import { PiCalendarCheckFill, PiTrashBold  } from 'react-icons/pi';
import { page_transitions } from '../../constants/animations';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import LoadingData from '../../components/shared/loading'
import DeleteTeamModal from './components/DeleteTeamModal'

function UpdateTeam({team}) {
    const { isModalOpen, onOpenModal, onCloseModal } = useModal();
    const {
        teamData,
        errors,
        handleInput,
        handleToggle,
        updateTeamLoading,
        onUpdateTeam,
        onDeleteTeam
    } = useTeam({team});

    if ( updateTeamLoading ) return <LoadingData />

    return (
        <motion.main {...page_transitions} className='page teams'>
            <header className='header'>
                <Back />
                <Button
                    label="Update Team"
                    styles="primary"
                    icon={PiCalendarCheckFill}
                    action={onUpdateTeam}
                    disabled={Object.keys(errors).length > 0}
                />
            </header>
            <Scroll>
                <form className='session_form'>
                    <header className='form_header'>
                        <h2>Update Team</h2>
                    </header>
                    <Input
                        label="What will you call your team"
                        placeholder='BallHogs'
                        value={teamData?.name}
                        setValue={handleInput}
                        name='name'
                        error={errors?.name}
                        disabled={false}
                    />
                    <PrivacyToggle data={teamData} handleToggle={handleToggle} />
                    <footer className='form_caution'>
                        <Button
                            label="Delete Team"
                            styles="tertiary"
                            icon={PiTrashBold}
                            action={onOpenModal}
                        />
                    </footer>
                </form>
            </Scroll>
            <Modal
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
            >
                <DeleteTeamModal
                    deleteTeam={onDeleteTeam}
                    close={onCloseModal}
                />
            </Modal>
        </motion.main>
    )
}

function UpdateTeamWrapper() {
    const { id } = useParams();
    const { data: team, error: teamErr, isLoading: teamLoading } = useQuery(['team', id], () => getTeam(id));
    if (teamLoading) return <LoadingData />
    const teamData = team.data;
    return <UpdateTeam team={teamData} />

}

export default UpdateTeamWrapper;
