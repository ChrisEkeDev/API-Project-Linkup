import React from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkCheckIn, thunkCheckOut, thunkRemoveFromSession, thunkAddToSession, thunkGetSessionCheckIns  } from "../../../store/checkins"
import { useSelector } from 'react-redux';

function useCheckIns() {
    const { dispatch, handleAlerts } = useApp();
    const sessionId = useSelector(state => state.sessions.singleSession).id;

    const checkIn = async () => {
        try {
            const res_1 = await dispatch(thunkCheckIn(sessionId));
            const res_2 = await dispatch(thunkGetSessionCheckIns(sessionId))
            handleAlerts(res_1)
            if (res_1.status >= 400 || res_2.status >= 400 ) {
                throw new Error();
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkOut = async () => {
        try {
            const res_1 = await dispatch(thunkCheckOut(sessionId));
            const res_2 = await dispatch(thunkGetSessionCheckIns(sessionId))
            handleAlerts(res_1);
            if ( res_1.status >= 400 || res_2 >= 400 ) {
                throw new Error();
            }
        } catch (e) {
            console.error(e)
        }
    }

    const addToSession = async (sessionId, playerId) => {
        try {
            const res = await dispatch(thunkAddToSession(sessionId, playerId))
            handleAlerts(res);
            if ( res.status >= 400) {
                throw new Error();
            }
        } catch(e) {
            console.error(e)
        }
    }

    const removeFromSession = async (sessionId, playerId) => {
        try {
            const res = await dispatch(thunkRemoveFromSession(sessionId, playerId))
            handleAlerts(res);
            if ( res.status >= 400) {
                throw new Error();
            }
        } catch(e) {
            console.error(e)
        }
    }

    return {
        addToSession,
        removeFromSession,
        checkIn,
        checkOut
    }
}

export default useCheckIns;
