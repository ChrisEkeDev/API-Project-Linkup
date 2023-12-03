import React, { useEffect, useState } from 'react';
import { useApp } from '../../App/Context/AppContext';
import { thunkGetAllSessions } from '../../Store/sessions';
import { sessionsAlerts } from '../../Shared/constants/alertData';
import { useDispatch } from 'react-redux';

function useGetSessions() {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const { handleAlerts } = useApp();
  const { sessionsNotFound } = sessionsAlerts;
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    const getSessions = async() => {
        try {
          await dispatch(thunkGetAllSessions());
          setData(true)
        } catch(error) {
          handleAlerts(sessionsNotFound);
          setData(false)
        } finally {
            setLoading(false)
        }
      }
      getSessions()
  }, [dispatch])

  return [data, loading]
}

export default useGetSessions;
