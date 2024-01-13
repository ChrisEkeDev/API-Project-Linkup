import React from 'react'
import { useApp } from '../../../context/AppContext'
import { thunkLeaveTeam, thunkJoinTeam, thunkRemoveFromTeam, thunkAddToTeam, thunkPromoteToCoHost } from '../../../store/memberships'
import { membershipAlerts } from '../../../constants/alerts'

function useMemberships() {
    const { dispatch, navigate, handleAlerts } =useApp();
    const { playerMembershipDeleteSuccess, playerMembershipDeleteError, authMembershipDeleteSuccess, authMembershipDeleteError} = membershipAlerts;

    const joinTeam = async (teamId) => {
        try {
            const res = await dispatch(thunkJoinTeam(teamId))
            handleAlerts(playerMembershipDeleteSuccess)
            navigate(`/teams/${teamId}`)
        } catch(e) {
            handleAlerts(playerMembershipDeleteError)
            console.log(e)
        }
    }

    const leaveTeam = async (teamId) => {
        try {
            const res = await dispatch(thunkLeaveTeam(teamId))
            // handleAlerts(playerMembershipDeleteSuccess)
            navigate(`/teams/${teamId}`)
        } catch(e) {
            // handleAlerts(playerMembershipDeleteError)
            console.log(e)
        }
    }

    const addToTeam = async (teamId, playerId) => {
        try {
            const res = await dispatch(thunkAddToTeam(teamId, playerId))
            // handleAlerts(authMembershipDeleteSuccess)
        } catch(e) {
            // handleAlerts(authMembershipDeleteError)
            console.log(e)
        }
    }

    const promoteToCoHost = async (teamId, playerId) => {
        try {
            const res = await dispatch(thunkPromoteToCoHost(teamId, playerId))
            // handleAlerts(authMembershipDeleteSuccess)
        } catch(e) {
            // handleAlerts(authMembershipDeleteError)
            console.log(e)
        }
    }

    const removeFromTeam = async (teamId, playerId) => {
        try {
            const res = await dispatch(thunkRemoveFromTeam(teamId, playerId))
            // handleAlerts(authMembershipDeleteSuccess)
        } catch(e) {
            // handleAlerts(authMembershipDeleteError)
            console.log(e)
        }
    }


    return {addToTeam, promoteToCoHost,  joinTeam, leaveTeam, removeFromTeam }
}

export default useMemberships
