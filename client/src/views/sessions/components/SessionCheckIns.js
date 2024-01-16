import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SessionPlayer from './SessionPlayer'
import { parent_variants } from '../../../constants/animations'

function SessionCheckIns({checkIns}) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({x: 0, y: 0});

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX); // Multiply by 2 for faster scrolling
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className='session_players'>
      <span className='section_label xs bold'>{checkIns.length} Players </span>
        <ul
          className='checkIn_list'
          ref={carouselRef}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onDrag}
          >
          <AnimatePresence>
            {
                checkIns.map(checkIn => (
                    <SessionPlayer key={checkIn.id} checkIn={checkIn}/>
                ))
            }
          </AnimatePresence>
        </ul>
    </div>
  )
}

export default SessionCheckIns
