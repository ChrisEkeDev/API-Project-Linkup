import React, { useState, useRef } from 'react'
import { useApp } from '../../../context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';
import { TbHandFinger } from "react-icons/tb";
import './styles.scss';

function ClickDragScroll(props) {
    const { title, children} = props;
    const { settings } = useApp();
    const settingsData = settings?.data;
    const { theme } = settingsData;
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
            className={`click-drag_container click-drag_container-${theme}`}>
            <span className='section_label xs bold'>{title}</span>
            <div className="click-drag_overlay"></div>
            <ul
                className='click-drag_list'
                ref={ref}
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={onDrag}
            >
            <AnimatePresence>
                <div
                    className="swipe_icon"
                    key={'start-pointer'}
                >
                    <span className='xs bold'>Drag</span>
                    <TbHandFinger className="icon" />
                </div>
                    {children}
                <div
                    className="swipe_icon"
                    key={'end-pointer'}
                >
                    <TbHandFinger className="icon" />
                    <span className='xs bold'>Drag</span>
                </div>
            </AnimatePresence>
            </ul>
        </section>
    )
}

export default ClickDragScroll
