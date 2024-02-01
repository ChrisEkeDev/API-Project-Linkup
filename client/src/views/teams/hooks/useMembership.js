import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { membershipAlerts } from '../../../constants/alerts';
import { requestToJoinTeam, requestToLeaveTeam } from '../../../store/teams';

function useMembership() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();
    const { requestToJoinTeamSuccess, requestToJoinTeamError, requestToLeaveTeamSuccess, requestToLeaveTeamError } = membershipAlerts;

    const handleJoinTeamSuccess = () => {
        handleAlerts(requestToJoinTeamSuccess)
        client.invalidateQueries(['membership-status', 'team-memberships'])
    }

    const handleLeaveTeamSuccess = () => {
        handleAlerts(requestToLeaveTeamSuccess)
        client.invalidateQueries(['membership-status', 'team-memberships'])
    }

    const handleJoinTeamError = () => {
        handleAlerts(requestToJoinTeamError)
    }

    const handleLeaveTeamError = () => {
        handleAlerts(requestToLeaveTeamError)
    }


    const {
        mutate: handleJoinTeam
    } = useMutation({
        mutationFn: requestToJoinTeam,
        onError: handleJoinTeamError,
        onSuccess: handleJoinTeamSuccess
    })

    const {
        mutate: handleLeaveTeam
    } = useMutation({
        mutationFn: requestToLeaveTeam,
        onError: handleLeaveTeamError,
        onSuccess: handleLeaveTeamSuccess
    })

    const onRequestToJoinTeam = async () => {
        handleJoinTeam(id)
    }

    const onRequestToLeaveTeam = async () => {
        handleLeaveTeam(id)
    }

    return { onRequestToJoinTeam, onRequestToLeaveTeam }
}

export default useMembership
