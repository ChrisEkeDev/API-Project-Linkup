import React from 'react'
import { deleteSession } from '../../../store/sessions'
import { sessionsAlerts } from '../../../constants/alerts';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

function useDeleteSession() {
    const client = useQueryClient();
    const { id } = useParams()
    const { deleteSessionSuccess, deleteSessionError } = sessionsAlerts;
    const { navigate, handleAlerts } = useApp();

    const handleErrors = (newErrors) => {
        handleAlerts(deleteSessionError)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['session'], data)
        client.invalidateQueries(['session'])
        handleAlerts(deleteSessionSuccess)
        navigate(`/sessions`)
    }

    const onDeleteSession = async (e) => {
        e.preventDefault();
        handleSubmit(id)
    }

    const {
        mutate: handleSubmit,
    } = useMutation({
        mutationFn: deleteSession,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

    return { onDeleteSession }
}

export default useDeleteSession
