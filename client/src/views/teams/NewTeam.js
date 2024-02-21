import React from 'react';
import Form from '../../components/shared/layout/Form';
import useTeam from './hooks/useTeam';
import LoadingData from '../../components/shared/loading';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import { TbCalendarPlus  } from 'react-icons/tb';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'
import { useApp } from '../../context/AppContext';
import PageContainer from '../../components/shared/layout/PageContainer';
import PageHeader from '../../components/shared/layout/PageHeader';

function NewTeam() {
    const {
        teamData,
        errors,
        handleInput,
        handleToggle,
        createTeamLoading,
        onCreateTeam
    } = useTeam({});

    if (createTeamLoading ) return <LoadingData />

    return (
        <PageContainer>
            <PageHeader>
                <header className='float_full'>
                    <Back />
                    <Button
                        label="Create Team"
                        styles='primary'
                        icon={TbCalendarPlus}
                        action={onCreateTeam}
                        disabled={Object.keys(errors).length > 0}
                    />
                </header>
            </PageHeader>
            <Scroll>
                <Form title="Create New Team">
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
                    <PrivacyToggle data={teamData} handleToggle={handleToggle}/>
                    {/* PLACE TO UPLOAD IMAGES */}
                </Form>
            </Scroll>
        </PageContainer>
    )
}

export default NewTeam
