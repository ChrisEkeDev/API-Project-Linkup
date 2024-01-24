import React, { useState, useEffect } from 'react'
import { format, parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isWithinInterval, isAfter } from 'date-fns'
import { useApp } from '../../context/AppContext'

function CountDown({endTime, expires }) {
    const { currentTime } = useApp();
    const [ timeLeft, setTimeLeft ] = useState(null)

    const getDaysLeft = differenceInDays(new Date(endTime), new Date(currentTime))
    const getHoursLeft = differenceInHours(new Date(endTime), new Date(currentTime))
    const getMinutesLeft = differenceInMinutes(new Date(endTime), new Date(currentTime))
    const isExpired = isAfter(new Date(currentTime), new Date(expires))
    const happeningNow = isWithinInterval(new Date(currentTime), {
        start: new Date(endTime),
        end: new Date(expires)
    })

    useEffect(() => {
        const timeLeft = new Date(endTime) - new Date(currentTime)
        if (timeLeft < 0) {
            setTimeLeft(0)
        } else {
            setTimeLeft(timeLeft)
        }
    }, [currentTime])

    return (
        <span className='bold sm'>
            {
                isExpired ?
                <>Expired</> :
                happeningNow ?
                <>Happening Now</> :
                timeLeft > 0 ?
                <>
                    {
                        `Starting in ${
                            getHoursLeft > 24  ? getDaysLeft === 1 ? getDaysLeft + ' day' : getDaysLeft + ' days'  :
                            getMinutesLeft > 60 ? getHoursLeft + " hours" :
                            getMinutesLeft + ' mins'
                        }`
                    }
                </> :
                <>
                Already Started
                </>
            }
        </span>
    )
}

export default CountDown
