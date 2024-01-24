import React, { useState, useEffect } from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkSearchTeams } from '../../../store/teams'

const useTeamSearch = () => {
    const { dispatch } = useApp();
    const [ query, setQuery ] = useState('')
    const [ sortBy, setSortBy ] = useState('createdAt');

    const handleSort = (sort) => {
        setSortBy(sort)
    }

    const handleInput = (x) => {
        setQuery(x.target.value)
    }

    const searchTeams = async () => {
      try {
        await dispatch(thunkSearchTeams(query, sortBy))
      } catch(e) {
        console.log(e)
      }
    }



    useEffect(() => {
        searchTeams()
    }, [sortBy])

    return { sortBy, handleSort, handleInput, searchTeams }
}

export default useTeamSearch
