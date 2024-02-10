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

    const {
        createTeamSuccess,
        createTeamError,
        updateTeamSuccess,
        updateTeamError,
        deleteTeamSuccess,
        deleteTeamError
    } = teamAlerts;

        /////////////////////////////////////////////////////////
    //  Create Team

    const handleCreateTeamSuccess = (data) => {
        handleAlerts(createTeamSuccess)
        client.setQueryData(['team'], data)
        client.invalidateQueries(['team'])
        navigate(`/teams/${data.id}`)
    }

    const handleCreateTeamError = (data) => {
        handleAlerts(createTeamError)
        console.log(data)
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
        onSuccess: handleCreateTeamSuccess,
        onError: handleCreateTeamError
    })



    /////////////////////////////////////////////////////////
    //  Update Team

    const handleUpdateTeamSuccess = (data) => {
        client.setQueryData(['team'], id)
        client.invalidateQueries(['team'])
        handleAlerts(updateTeamSuccess)
        navigate(`/teams/${id}`)
    }

    const handleUpdateTeamError = (data) => {
        handleAlerts(updateTeamError)
        console.log(data)
    }

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
        onSuccess: handleUpdateTeamSuccess,
        onError: handleUpdateTeamError
    })



    /////////////////////////////////////////////////////////
    //  Delete Team

    const handleDeleteTeamSuccess = (data) => {
        navigate(`/teams`)
        client.setQueryData(['team'], data)
        client.invalidateQueries(['team'])
        handleAlerts(deleteTeamSuccess)
    }

    const handleDeleteTeamError = (data) => {
        handleAlerts(deleteTeamError)
        console.log(data)
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
        onError: handleDeleteTeamError
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
