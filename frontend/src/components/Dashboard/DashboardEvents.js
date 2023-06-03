import React from 'react'
import DashboardEventItem from './DashboardEventItem'

function DashboardEvents({events}) {
    console.log(events)
  return (
    <ul>
        {events.map(event => {
            return (
                <DashboardEventItem id={event.eventId}/>
            )
        })}
    </ul>
  )
}

export default DashboardEvents
