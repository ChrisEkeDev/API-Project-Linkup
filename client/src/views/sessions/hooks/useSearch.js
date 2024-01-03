import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useApp } from '../../../context/AppContext'
import { thunkSearchSessions, thunkGetAllSessions } from '../../../store/sessions'

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

    const searchSessions = async () => {
      try {
        await dispatch(thunkSearchSessions(query, sortBy))
      } catch(e) {
        console.log(e)
      }
    }



    useEffect(() => {
      searchSessions()
    }, [sortBy])

    return { sortBy, handleSort, handleInput, searchSessions }
}

export default useSearch
