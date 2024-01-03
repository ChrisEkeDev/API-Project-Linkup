import React, { useEffect, useState } from 'react'

function useAppClock() {
    const [ currentTime, setCurrentTime ] = useState(new Date())

    useEffect(() => {
        const timerId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);

        return () => {
          clearInterval(timerId);
        };
    }, []);


    return { currentTime }
}

export default useAppClock
