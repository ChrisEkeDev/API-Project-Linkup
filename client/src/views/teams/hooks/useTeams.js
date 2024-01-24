import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useApp } from "../../../context/AppContext"
import { thunkGetMyMemberships } from '../../../store/memberships'
import { thunkGetMyTeams } from '../../../store/teams'


function useTeams() {
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await dispatch(thunkGetMyTeams())
                const res2 = await dispatch(thunkGetMyMemberships())
                if (res.status === 200 && res2.status === 200) {
                    setLoading(false)
                }
              } catch(e) {
                console.log(e)
              }
        }
        getData()
      }, [])

    return { loading }
}

export default useTeams
