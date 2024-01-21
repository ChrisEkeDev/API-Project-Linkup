import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useApp } from "../../../context/AppContext"
import { thunkGetMyCheckIns } from '../../../store/checkins'
import { thunkGetMySessions } from '../../../store/sessions'


function useSessions() {
    const { dispatch } = useApp();
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await dispatch(thunkGetMySessions())
                const res2 = await dispatch(thunkGetMyCheckIns())
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

export default useSessions
