import React from 'react'
import { useSelector } from 'react-redux'
import { thunkDeleteTeam } from '../../../store/teams'
import { useApp } from '../../../context/AppContext';

function useDeleteTeam() {
    const { dispatch, navigate, handleAlerts, setLoading } = useApp();
    const teamId = useSelector(state => state.teams.singleTeam).id;

    const deleteTeam =  async () => {
        setLoading(true);
        try {
            const res = await dispatch(thunkDeleteTeam(teamId))
            handleAlerts(res)
            navigate('/teams')
            if ( res.status >= 400) {
                throw new Error()
            }
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return { deleteTeam }
}

export default useDeleteTeam
