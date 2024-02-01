import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addToSession, removeFromSession } from '../../../store/sessions';
import { checkInAlerts } from '../../../constants/alerts';

function useSessionCheckIns() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();
    const { addToSessionSuccess, removeFromSessionSuccess, addToSessionError, removeFromSessionError } = checkInAlerts;

    const handleRemoveFromSessionSuccess = () => {
        handleAlerts(removeFromSessionSuccess)
        client.invalidateQueries(['session-checkIns'])
    }

    const handleAddToSessionSuccess = () => {
        handleAlerts(addToSessionSuccess)
        client.invalidateQueries(['session-checkIns'])
    }

    const handleAddToSessionError = () => {
        handleAlerts(addToSessionError)
    }

    const handleRemoveFromSessionError = () => {
        handleAlerts(removeFromSessionError)
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
        handleRemoveFromSession(id)
    }

    const onAddToSession = async (playerId) => {
        const data = { sessionId: id, playerId }
        handleAddToSession(id)
    }

    return { onRemoveFromSession, onAddToSession }
}


export default useSessionCheckIns;
