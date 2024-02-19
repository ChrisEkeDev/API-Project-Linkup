import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useTeam from './hooks/useTeam';
import LoadingData from '../../components/shared/loading';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import { TbCalendarPlus  } from 'react-icons/tb';
import { page_transitions } from '../../constants/animations';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'

function NewTeam() {
    const {
        teamData,
        errors,
        handleInput,
        handleToggle,
        createTeamLoading,
        onCreateTeam
    } = useTeam({});

    if (createTeamLoading) return <LoadingData />

    return (
        <motion.main {...page_transitions} className='page teams'>
            <header className='header'>
                <Back />
                <Button
                    label="Create Team"
                    styles="primary"
                    icon={TbCalendarPlus}
                    action={onCreateTeam}
                    disabled={Object.keys(errors).length > 0}
                />
            </header>
            <Scroll>
                <form className='session_form'>
                    <header className='form_header'>
                        <h2>Create New Team</h2>
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
                    <PrivacyToggle data={teamData} handleToggle={handleToggle}/>
                    {/* PLACE TO UPLOAD IMAGES */}
                </form>
            </Scroll>
        </motion.main>
    )
}

export default NewTeam
