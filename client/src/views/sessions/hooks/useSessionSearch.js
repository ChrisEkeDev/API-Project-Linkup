import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkSearchSessions } from '../../../store/sessions'
import { thunkSearchTeams } from '../../../store/teams'

const useSearch = () => {
    const { dispatch } = useApp();
    const [ query, setQuery ] = useState('')
    const [ sortBy, setSortBy ] = useState('startDate');

    const handleSort = (sort) => {
        setSortBy(sort)
    }

    const handleInput = (x) => {
        setQuery(x.target.value)
    }

    const search = async () => {
      try {
        await dispatch(thunkSearchSessions(query, sortBy))
        await dispatch(thunkSearchTeams(query, sortBy))
      } catch(e) {
        console.log(e)
      }
    }



    useEffect(() => {
      search()
    }, [sortBy])

    return { sortBy, handleSort, handleInput, search }
}

export default useSearch
