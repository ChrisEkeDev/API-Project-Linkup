import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNewTeam from './hooks/useNewTeam';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import { PiCalendarPlusBold  } from 'react-icons/pi';
import { page_transitions } from '../../constants/animations';
import PrivacyToggle from '../../components/shared/inputs/PrivacyToggle'

function NewTeam() {
    const { teamData,errors, handleInput, handleToggle, createTeam, } = useNewTeam();

    return (
        <motion.main {...page_transitions} className='page teams'>
            <header className='header'>
                <Back />
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
                    <PrivacyToggle {...{ teamData, handleToggle }} />
                    {/* PLACE TO UPLOAD IMAGES */}
                    <footer className='form_actions'>
                        <Button
                        label="Create Team"
                        styles="primary"
                        icon={PiCalendarPlusBold}
                        action={createTeam}
                        disabled={Object.keys(errors).length > 0}
                        />
                    </footer>
                </form>
            </Scroll>
        </motion.main>
    )
}

export default NewTeam
