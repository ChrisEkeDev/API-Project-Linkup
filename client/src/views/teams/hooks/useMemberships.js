// import React from 'react'
// import { useApp } from '../../../context/AppContext'
// import { thunkLeaveTeam, thunkJoinTeam, thunkRemoveFromTeam, thunkAddToTeam, thunkPromoteToCoHost, thunkGetTeamMemberships } from '../../../store/memberships'
// import { membershipAlerts } from '../../../constants/alerts'

// function useMemberships() {
//     const { dispatch, handleAlerts } =useApp();
//     const { playerMembershipDeleteError, authMembershipDeleteError} = membershipAlerts;

//     const joinTeam = async (teamId) => {
//         try {
//             const res_1 = await dispatch(thunkJoinTeam(teamId))
//             const res_2 = await dispatch(thunkGetTeamMemberships(teamId))
//             handleAlerts(res_1);
//             if ( res_1.status >= 400 || res_2 >= 400 ) {
//                 throw new Error();
//             }
//         } catch(e) {
//             // handleAlerts(playerMembershipDeleteError)
//             console.log(e)
//         }
//     }

//     const leaveTeam = async (teamId) => {
//         try {
//             const res_1 = await dispatch(thunkLeaveTeam(teamId))
//             const res_2 = await dispatch(thunkGetTeamMemberships(teamId))
//             handleAlerts(res_1);
//             if ( res_1.status >= 400 || res_2 >= 400 ) {
//                 throw new Error();
//             }
//         } catch(e) {
//             // handleAlerts(playerMembershipDeleteError)
//             console.log(e)
//         }
//     }

//     const addToTeam = async (teamId, playerId) => {
//         try {
//             const res = await dispatch(thunkAddToTeam(teamId, playerId))
//         } catch(e) {
//             // handleAlerts(authMembershipDeleteError)
//             console.log(e)
//         }
//     }

//     const promoteToCoHost = async (teamId, playerId) => {
//         try {
//             const res = await dispatch(thunkPromoteToCoHost(teamId, playerId))
//         } catch(e) {
//             // handleAlerts(authMembershipDeleteError)
//             console.log(e)
//         }
//     }

//     const removeFromTeam = async (teamId, playerId) => {
//         try {
//             const res = await dispatch(thunkRemoveFromTeam(teamId, playerId))
//         } catch(e) {
//             console.log(e)
//         }
//     }


//     return {addToTeam, promoteToCoHost,  joinTeam, leaveTeam, removeFromTeam }
// }

// export default useMemberships
