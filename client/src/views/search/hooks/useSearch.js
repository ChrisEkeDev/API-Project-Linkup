import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkSearchSessions } from '../../../store/sessions'
import { thunkSearchTeams } from '../../../store/teams'


const useSearch = ({tab}) => {
    const [ query, setQuery ] = useState('')
    const [ sortBy, setSortBy ] = useState(tab === 'sessions' ? 'startDate' : 'createdAt');

    const handleSort = (sort) => {
        setSortBy(sort)
    }

    const handleInput = (x) => {
        setQuery(x.target.value)
    }

    return {
      query,
      sortBy,
      handleSort,
      handleInput
    }
}

export default useSearch
