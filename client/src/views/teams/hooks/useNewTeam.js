import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { teamAlerts } from '../../../constants/alerts';
import { useMutation, useQueryClient } from 'react-query';
import { createTeam } from "../../../store/teams"

function useNewTeam(team) {
    const client = useQueryClient();
    const { navigate, handleAlerts } = useApp();
    const { createTeamSuccess, createTeamError } = teamAlerts;
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

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        handleAlerts(createTeamError)
        setErrors(newState)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['team'], data.id)
        client.invalidateQueries(['team'])
        handleAlerts(createTeamSuccess)
        navigate(`/teams/${data.id}`)
    }

    const onCreateTeam = async (e) => {
        e.preventDefault();
        handleSubmit(teamData)
    }

    const {
        mutate: handleSubmit,
        isLoading: createTeamLoading
    } = useMutation({
        mutationFn: createTeam,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

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
        createTeamLoading,
        onCreateTeam,
    };
}

export default useNewTeam
