import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addToTeam, removeFromTeam, promoteToCoHost } from '../../../store/teams';
import { membershipAlerts } from '../../../constants/alerts';

function useTeamMemberships() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();
    const { addToTeamError, addToTeamSuccess, promoteToCoHostError, promoteToCoHostSuccess, removeFromTeamError, removeFromTeamSuccess } = membershipAlerts;

    const handleAddToTeamSuccess = () => {
        handleAlerts(addToTeamSuccess)
        client.invalidateQueries(['team-memberships'])
    }

    const handlePromoteToCoHostSuccess = () => {
        handleAlerts(promoteToCoHostSuccess);
        client.invalidateQueries(['team-memberships'])
    }

    const handleRemoveFromTeamSuccess = () => {
        handleAlerts(removeFromTeamSuccess);
        client.invalidateQueries(['team-memberships'])
    }

    const handleAddToTeamError = () => {
        handleAlerts(addToTeamError)
    }

    const handlePromoteToCoHostError = () => {
        handleAlerts(promoteToCoHostError)
    }

    const handleRemoveFromTeamError = () => {
        handleAlerts(removeFromTeamError)
    }


    const {
        mutate: handleAddToTeam
    } = useMutation({
        mutationFn: addToTeam,
        onError: handleAddToTeamError,
        onSuccess: handleAddToTeamSuccess
    })

    const {
        mutate: handlePromoteToCoHost
    } = useMutation({
        mutationFn: promoteToCoHost,
        onError: handlePromoteToCoHostError,
        onSuccess: handlePromoteToCoHostSuccess
    })

    const {
        mutate: handleRemoveFromTeam
    } = useMutation({
        mutationFn: removeFromTeam,
        onError: handleRemoveFromTeamError,
        onSuccess: handleRemoveFromTeamSuccess
    })

    const onAddToTeam = async (playerId) => {
        const data = { teamId: id, playerId}
        handleAddToTeam(data)
    }

    const onPromoteToCoHost = async (playerId) => {
        const data = { teamId: id, playerId}
        handlePromoteToCoHost(data)
    }

    const onRemoveFromTeam = async (playerId) => {
        const data = { teamId: id, playerId}
        handleRemoveFromTeam(data)
    }

  return { onAddToTeam, onPromoteToCoHost, onRemoveFromTeam}
}

export default useTeamMemberships
