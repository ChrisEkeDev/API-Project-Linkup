import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { requestToJoinTeam, requestToLeaveTeam } from '../../../store/teams';

function useMembership() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();

    const handleSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['membership-status'])
        client.invalidateQueries(['team-memberships'])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }


    const {
        mutate: handleJoinTeam
    } = useMutation({
        mutationFn: requestToJoinTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const {
        mutate: handleLeaveTeam
    } = useMutation({
        mutationFn: requestToLeaveTeam,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const onRequestToJoinTeam = async () => {
        try {
            handleJoinTeam(id)
        } catch(e) {
            console.error(e)
        }
    }

    const onRequestToLeaveTeam = async () => {
        try {
            handleLeaveTeam(id)
        } catch(e) {
            console.error(e)
        }
    }

    return { onRequestToJoinTeam, onRequestToLeaveTeam }
}

export default useMembership
