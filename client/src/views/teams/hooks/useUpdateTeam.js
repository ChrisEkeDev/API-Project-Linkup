import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { teamAlerts } from '../../../constants/alerts';
import { useMutation, useQueryClient } from 'react-query';
import { updateTeam } from "../../../store/teams"

function useUpdateTeam(team) {
    const client = useQueryClient();
    const { navigate, handleAlerts } = useApp();
    const { updateTeamSuccess, updateTeamError } = teamAlerts;
    const [ errors, setErrors ] = useState({});
    const [ teamData, setTeamData ] = useState({
        id: team.id,
        name: team.name,
        private: team.private
    });

    const handleInput = (x) => {
        setTeamData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleToggle = () => {
        setTeamData((prev) => ({ ...prev, private: !teamData.private }));
    }

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        handleAlerts(updateTeamError)
        setErrors(newState)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['team'], data.id)
        client.invalidateQueries(['team'])
        handleAlerts(updateTeamSuccess)
        navigate(`/teams/${data.id}`)
    }

    const onUpdateTeam = async (e) => {
        e.preventDefault();
        handleSubmit(teamData)
    }

    const {
        mutate: handleSubmit,
        isLoading: updateTeamLoading
    } = useMutation({
        mutationFn: updateTeam,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

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
        updateTeamLoading,
        onUpdateTeam,
    };
}

export default useUpdateTeam;
