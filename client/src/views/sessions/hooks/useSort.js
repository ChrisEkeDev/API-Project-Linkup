import React, { useEffect, useState } from 'react'
import { sortValues } from '../../../constants/constants'
import { sortFunctions } from '../../../constants/constants'

const useSort = (sessions) => {
    const [ sortBy, setSortBy ] = useState(sortValues.happeningSoon);
    const [ sortedSessions, setSortedSessions ] = useState([])

    useEffect(() => {
        let newSessions = sessions.sort(sortFunctions[sortBy]);
        setSortedSessions(newSessions)
    }, [sortBy])

    return { sortedSessions, setSortBy }
}

export default useSort
