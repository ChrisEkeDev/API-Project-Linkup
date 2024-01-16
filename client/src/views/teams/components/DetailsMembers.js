import React, { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ProfileImage from '../../../components/shared/profileImage'
import { PiHandSwipeLeftFill, PiHandSwipeRightFill } from "react-icons/pi";
import TeamMember from './TeamMember';

function DetailsMembers(props) {
    const {teamMembershipsArr, singleTeam } = props;
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0});

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
      };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX); // Multiply by 2 for faster scrolling
        ref.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section
            className='session_players'>
            <span className='section_label xs bold'>{teamMembershipsArr.length} Members</span>
            <div className="members_overlay"></div>
            <ul
                className='details_members'
                ref={ref}
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={onDrag}
            >
            <AnimatePresence>
                <PiHandSwipeLeftFill className="swipe_icon" />
                <ProfileImage size={6} player={singleTeam.captain} />
                {
                    teamMembershipsArr.map((membership) => {
                        if (membership.status !== 'host') {
                            return <TeamMember key={membership.id} membership={membership}/>
                        }
                    })
                }
                <PiHandSwipeRightFill className="swipe_icon" />
            </AnimatePresence>
            </ul>
        </section>
  )
}

export default DetailsMembers
