import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useApp } from '../../../context/AppContext'
import { thunkGetAllSessions } from '../../../store/sessions'

const useSearch = () => {
    const { dispatch } = useApp();
    const sessionData = useSelector(state => state.sessions.allSessions);
    const sessions = Object.values(sessionData);
    const [ query, setQuery ] = useState('')
    const [ loading, setLoading ] = useState(true)
    const [ sortBy, setSortBy ] = useState('happeningSoon');

    const handleSort = (sort) => {
        setSortBy(sort)
    }

    const handleInput = (x) => {
        setQuery(x.target.value)
    }

    useEffect(() => {
        const getSessions = async () => {
            try {
                const res = await dispatch(thunkGetAllSessions());
                if (res.status === 200) {
                    setLoading(false)
                }
            } catch(e) {
                console.log(e)
            }
        }
        getSessions()
    }, [dispatch])

    return { loading, sortBy, handleSort, sessions, handleInput }
}

export default useSearch
