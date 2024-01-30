import React from 'react'
import { deleteTeam } from '../../../store/teams'
import { useApp } from '../../../context/AppContext';
import { teamAlerts } from '../../../constants/alerts';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

function useDeleteTeam() {
    const client = useQueryClient();
    const { id } = useParams();
    const { deleteTeamSuccess, deleteTeamError } = teamAlerts;
    const { navigate, handleAlerts } = useApp();

    const handleErrors = (newErrors) => {
        handleAlerts(deleteTeamError)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['team'], data)
        client.invalidateQueries(['team'])
        handleAlerts(deleteTeamSuccess)
        navigate(`/teams`)
    }

    const onDeleteTeam = async (e) => {
        e.preventDefault();
        handleSubmit(id)
    }

    const {
        mutate: handleSubmit,
        isLoading: deleteTeamLoading
    } = useMutation({
        mutationFn: deleteTeam,
        onError: handleErrors,
        onSuccess: handleSuccess
    })



    return { onDeleteTeam, deleteTeamLoading }
}

export default useDeleteTeam
