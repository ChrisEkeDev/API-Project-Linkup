import React from 'react';
import { getTeam } from '../../store/teams';
import Form from '../../components/shared/layout/Form';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import useTeam from './hooks/useTeam';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import Modal from '../../components/shared/modal';
import useModal from '../../hooks/useModal';
import { TbCalendarCheck, TbTrash } from 'react-icons/tb';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import LoadingData from '../../components/shared/loading'
import DeleteTeamModal from './components/DeleteTeamModal'
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

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
        <PageContainer>
            <PageHeader>
                <header className='float_full'>
                    <Back />
                    <Button
                        label="Update Team"
                        styles="primary"
                        icon={TbCalendarCheck}
                        action={onUpdateTeam}
                        disabled={Object.keys(errors).length > 0}
                    />
                </header>
            </PageHeader>
            <Scroll>
                <Form title='Update Team'>
                <div className='form_flex'>
                    <Input
                        label="What will you call your team"
                        placeholder='BallHogs'
                        value={teamData?.name}
                        setValue={handleInput}
                        name='name'
                        error={errors?.name}
                        disabled={false}
                    />
                </div>
                <PrivacyToggle data={teamData} handleToggle={handleToggle} />
                <footer className='form_caution'>
                    <Button
                        label="Delete Team"
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
                <DeleteTeamModal
                    deleteTeam={onDeleteTeam}
                    close={onCloseModal}
                />
            </Modal>
        </PageContainer>
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
