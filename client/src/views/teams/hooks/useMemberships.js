import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addToTeam, removeFromTeam, promoteToCoHost } from '../../../store/teams';
import { membershipAlerts } from '../../../constants/alerts';

function useMemberships() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();

    const handleSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['team-memberships', id])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }


    const {
        mutate: handleAddToTeam
    } = useMutation({
        mutationFn: addToTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const {
        mutate: handlePromoteToCoHost
    } = useMutation({
        mutationFn: promoteToCoHost,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const {
        mutate: handleRemoveFromTeam
    } = useMutation({
        mutationFn: removeFromTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const onAddToTeam = async (playerId) => {
        try {
            const data = { teamId: id, playerId}
            handleAddToTeam(data)
        } catch(e) {
            console.error(e)
        }
    }

    const onPromoteToCoHost = async (playerId) => {
        try {
            const data = { teamId: id, playerId}
            handlePromoteToCoHost(data)
        } catch(e) {
            console.error(e)
        }
    }

    const onRemoveFromTeam = async (playerId) => {
        try {
            const data = { teamId: id, playerId}
            handleRemoveFromTeam(data)
        } catch(e) {
            console.error(e)
        }
    }

  return { onAddToTeam, onPromoteToCoHost, onRemoveFromTeam }
}

export default useMemberships
