import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DetailsMembers from './DetailsMembers';
import ProfileImage from '../../../components/shared/profileImage'
import { useSelector } from 'react-redux'
import { format , parseISO } from 'date-fns'
import { PiUsers, PiLockFill, PiLockOpen, PiStarFill } from 'react-icons/pi';
import Scroll from '../../../components/shared/scroll';

function TeamDetails() {
    const singleTeam = useSelector(state => state.teams.singleTeam);
    const teamMemberships = useSelector(state => state.memberships.teamMemberships)
    const teamMembershipsArr = Object.values(teamMemberships)


    return (
        <Scroll>
            <DetailsMembers
                singleTeam={singleTeam}
                teamMembershipsArr={teamMembershipsArr}
            />
            <section className="container_border">
                <span className='section_label xs bold'>Latest Messages</span>
                {
                    singleTeam.TeamChats.length > 0 ?
                    <ul className="chat_preview_list">
                        {
                            singleTeam.TeamChats.map(chat => (
                                <li key={chat.id} className="chat_item">
                                    <ProfileImage
                                        size={4}
                                        player={chat.Player}
                                    />
                                    <div className="chat_details">
                                        <div className="chat_flex">
                                            <p className="sm bold">{chat.Player.name}</p>
                                            <span>&#8226;</span>
                                            <p className="xs bold">{format(parseISO(chat.createdAt), 'MM/dd/yy p')}</p>
                                        </div>
                                        <textarea className="textarea" disabled={true} value={chat.content}></textarea>
                                    </div>
                                </li>
                            ))
                        }
                    </ul> :
                    <div></div>
                }
            </section>
            <section className="container_border">
                <span className='section_label xs bold'>Upcoming Sessions</span>
            </section>
        </Scroll>
    )
}

export default TeamDetails
