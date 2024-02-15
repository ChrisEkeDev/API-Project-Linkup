import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addToSession, removeFromSession } from '../../../store/sessions';

function useCheckIns() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();

    const handleSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['session-checkIns', id])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleAddToSession
    } = useMutation({
        mutationFn: addToSession,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const {
        mutate: handleRemoveFromSession
    } = useMutation({
        mutationFn: removeFromSession,
        onSuccess: handleSuccess,
        onError: handleError
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
