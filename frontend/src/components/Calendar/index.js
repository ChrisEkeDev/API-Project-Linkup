import React, { useState } from 'react'

function Calendar() {
    const [ date, setDate ] = useState(new Date())
  return (
    <div>
        {date}
    </div>
  )
}

export default Calendar
