import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { teamAlerts } from '../../../constants/alerts';
import { thunkUpdateTeam } from "../../../store/teams";

function useUpdateTeam(team) {
    const { dispatch, navigate, setLoading, handleAlerts } = useApp();
    const { updateTeamSuccess, updateTeamError } = teamAlerts;
    const [ teamData, setTeamData ] = useState({
        name: team.name,
        private: team.private
    });
    const [ errors, setErrors ] = useState({});

    const handleInput = (x) => {
        setTeamData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleToggle = () => {
        setTeamData((prev) => ({ ...prev, private: !teamData.private }));
    }

    const updateTeam = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const data = await dispatch(thunkUpdateTeam(teamData, team.id));
            handleAlerts(updateTeamSuccess)
            navigate(`/teams/${data.data.id}`)
        } catch (e) {
            handleAlerts(updateTeamError)
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return {
        teamData,
        errors,
        handleInput,
        handleToggle,
        updateTeam,
    };
}

export default useUpdateTeam;
