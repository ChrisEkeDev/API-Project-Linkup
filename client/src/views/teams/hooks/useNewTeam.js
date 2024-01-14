import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { teamAlerts } from '../../../constants/alerts';
import { thunkCreateNewTeam } from "../../../store/teams";
import { thunkUpdateTeam } from "../../../store/teams";

function useNewTeam(team) {
    const { dispatch, navigate, setLoading, handleAlerts } = useApp();
    const { createTeamSuccess, createTeamError, updateTeamSuccess, updateTeamError  } = teamAlerts;
    const [ teamData, setTeamData ] = useState({
        name: team ? team?.name : '',
        private: team ? team?.private : false
    });
    const [ errors, setErrors ] = useState({});

    const handleInput = (x) => {
        setTeamData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleToggle = () => {
        setTeamData((prev) => ({ ...prev, private: !teamData.private }));
    }

    const createTeam = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const data = await dispatch(thunkCreateNewTeam(teamData));
            handleAlerts(createTeamSuccess)
            navigate(`/teams/${data.data.id}`)
        } catch (e) {
            handleAlerts(createTeamError)
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    // Session form input validation error handler
    useEffect(() => {
        const errors = {};
        const { name } = teamData;
        if (name && name.trim().length < 3) {
            errors.name = "Please enter a name for your team."
        }
        setErrors(errors)
    }, [ teamData.name ])

    return {
        teamData,
        errors,
        handleInput,
        handleToggle,
        createTeam,
    };
}

export default useNewTeam
