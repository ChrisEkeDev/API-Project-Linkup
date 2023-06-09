import React, { useRef, useEffect } from 'react';

function useOutsideClick(ref, cb) {
    useEffect(() => {
        function handleOutsideClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                cb()
            }
        }
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [ref])
}

export default function OutsideClicker({children, cb}) {
    const wrappedRef = useRef(null);
    useOutsideClick(wrappedRef, cb);
    return (
        <div style={{position: 'absolute', right: 0, top: '48px'}} ref={wrappedRef}>{children}</div>
    )
};
