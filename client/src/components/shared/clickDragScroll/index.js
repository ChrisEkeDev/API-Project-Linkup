import React, { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { PiHandSwipeLeftFill, PiHandSwipeRightFill } from "react-icons/pi";

function ClickDragScroll(props) {
    const { title, children} = props;
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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
            <span className='section_label xs bold'>{title}</span>
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
                <PiHandSwipeLeftFill
                    key={'start-pointer'}
                    className="swipe_icon"
                />
                    {children}
                <PiHandSwipeRightFill
                    key={'end-pointer'}
                    className="swipe_icon"
                />
            </AnimatePresence>
            </ul>
        </section>
    )
}

export default ClickDragScroll
