import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNewTeam from './hooks/useNewTeam';
import Back from '../../components/shared/button/Back';
import Input from '../../components/shared/inputs/textInput';
import Button from '../../components/shared/button';
import Scroll from '../../components/shared/scroll';
import { PiCheckCircleBold, PiWarningBold, PiMagnifyingGlassBold, PiMapPinBold, PiCalendarBold, PiClockBold, PiCalendarPlusBold, PiCaretUpDownBold, PiLightbulbBold, PiLockFill, PiLockOpenBold   } from 'react-icons/pi';
import { CgSpinner } from 'react-icons/cg';
import { page_transitions } from '../../constants/animations';

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
                    <div className='toggle_container' onClick={handleToggle}>
                        <p className={`sm ${!teamData.private && 'bold'}`}>Public</p>
                            <div className='toggle_switch'>
                                <div className={`toggle_node ${teamData.private && 'on_private'}`}></div>
                            </div>
                        <p className={`sm ${teamData.private && 'bold'}`}>Private</p>
                    </div>
                    <div className='tip'>
                        {
                            teamData.private ?
                            <PiLockFill className='tip_icon'/> :
                            <PiLockOpenBold className='tip_icon'/>
                        }
                        <p className='sm bold'>
                        {
                            teamData.private ?
                            'Private teams are closed by default, and members will have to be accepted into private teams by other members who\'s rank is co-host or host.' :
                            'Public teams are open to anyone, and players who requests to join will do so with requiring the host or co-host to accept.'
                        }
                         </p>
                    </div>

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
