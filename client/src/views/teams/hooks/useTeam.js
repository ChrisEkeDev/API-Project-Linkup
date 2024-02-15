import { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { teamAlerts } from '../../../constants/alerts';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { createTeam, updateTeam, deleteTeam } from "../../../store/teams"

function useTeam({team}) {
    const { id } = useParams();
    const client = useQueryClient();
    const { navigate, handleAlerts } = useApp();
    const [ errors, setErrors ] = useState({});
    const [ teamData, setTeamData ] = useState({
        id: team ? team?.id : null,
        name: team ? team?.name : '',
        private: team ? team?.private : false
    });

    const handleInput = (x) => {
        setTeamData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleToggle = () => {
        setTeamData((prev) => ({ ...prev, private: !teamData.private }));
    }


    const handleSuccess = (data) => {
        handleAlerts(data)
        client.setQueryData(['team'], data.data)
        client.invalidateQueries(['team'])
        navigate(`/teams/${data.data.id}`)
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const onCreateTeam = async (e) => {
        e.preventDefault();
        try {
            handleCreateTeam(teamData)
        } catch(e) {
            console.error(e)
        }
    }

    const {
        mutate: handleCreateTeam,
        isLoading: createTeamLoading
    } = useMutation({
        mutationFn: createTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })


    const onUpdateTeam = async (e) => {
        e.preventDefault();
        try {
            handleUpdateTeam(teamData)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleUpdateTeam,
        isLoading: updateTeamLoading
    } = useMutation({
        mutationFn: updateTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })


    const handleDeleteTeamSuccess = (data) => {
        navigate(`/teams`)
        client.setQueryData(['team'], data.data)
        client.invalidateQueries(['team'])
        handleAlerts(data)
    }

    const onDeleteTeam = async (e) => {
        e.preventDefault();
        try {
            handleDeleteTeam(id)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleDeleteTeam,
    } = useMutation({
        mutationFn: deleteTeam,
        onSuccess: handleDeleteTeamSuccess,
        onError: handleError
    })


    // Team form input validation error handler
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
        updateTeamLoading,
        onUpdateTeam,
        onDeleteTeam
    };
}

export default useTeam
