import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TeamMember from './TeamMember';
import ProfileImage from '../../../components/shared/profileImage'
import { useSelector } from 'react-redux'
import { PiUsers } from 'react-icons/pi';

function TeamDetails() {
    const singleTeam = useSelector(state => state.teams.singleTeam)
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships)

    return (
        <>
        <section className='team_information'>
            <ProfileImage player={singleTeam.captain} />
            <div>
                <p className='md bold'>{singleTeam.name}</p>
                <p className='sm '>Created by <strong>{singleTeam.captain.name}</strong></p>
            </div>
        </section>
        <div className='session_players'>
            <span className='section_label xs bold'>{teamMembershipsArr.length} Members </span>
            <motion.ul
                className='checkIn_list'
            >
            <AnimatePresence>
                {
                    teamMembershipsArr.map(membership => (
                        <TeamMember key={membership.id} membership={membership}/>
                    ))
                }
                <div className='see_all_players'>
                    {/* <PiUsers/> */}
                    <p className='xs'>See All</p>
                </div>
            </AnimatePresence>
            </motion.ul>
        </div>
        </>
    )
}

export default TeamDetails
