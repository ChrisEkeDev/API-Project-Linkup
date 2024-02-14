import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addToSession, removeFromSession } from '../../../store/sessions';

function useCheckIns() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();

    const handleRemoveFromSessionSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['session-checkIns'])
    }

    const handleAddToSessionSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['session-checkIns'])
    }

    const handleAddToSessionError = (error) => {
        handleAlerts(error)
    }

    const handleRemoveFromSessionError = (error) => {
        handleAlerts(error)
    }


    const {
        mutate: handleAddToSession
    } = useMutation({
        mutationFn: addToSession,
        onError: handleAddToSessionError,
        onSuccess: handleAddToSessionSuccess
    })

    const {
        mutate: handleRemoveFromSession
    } = useMutation({
        mutationFn: removeFromSession,
        onError: handleRemoveFromSessionError,
        onSuccess: handleRemoveFromSessionSuccess
    })

    const onRemoveFromSession = async (playerId) => {
        const data = { sessionId: id, playerId }
        try {
            handleRemoveFromSession(data)
        } catch (e) {
            console.error(e)
        }

    }

    const onAddToSession = async (playerId) => {
        const data = { sessionId: id, playerId }
        try {
            handleAddToSession(data)
        } catch (e) {
            console.error(e)
        }
    }

    return { onRemoveFromSession, onAddToSession }
}


export default useCheckIns;
