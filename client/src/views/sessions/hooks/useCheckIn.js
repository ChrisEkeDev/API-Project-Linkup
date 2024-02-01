import React from 'react'
import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { checkInAlerts } from '../../../constants/alerts';
import { checkInToSession, checkOutOfSession } from '../../../store/sessions';

function useCheckIn() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();
    const { checkOutError, checkInError, checkOutSuccess, checkInSuccess } = checkInAlerts;

    const handleCheckInSuccess = () => {
        handleAlerts(checkInSuccess)
        client.invalidateQueries(['check-in-status', 'session-checkIns'])
    }

    const handleCheckOutSuccess = () => {
        handleAlerts(checkOutSuccess)
        client.invalidateQueries(['check-in-status', 'session-checkIns'])
    }

    const handleCheckInError = () => {
        handleAlerts(checkInError)
    }

    const handleCheckOutError = () => {
        handleAlerts(checkOutError)
    }


    const {
        mutate: handleCheckIn
    } = useMutation({
        mutationFn: checkInToSession,
        onError: handleCheckInError,
        onSuccess: handleCheckInSuccess
    })

    const {
        mutate: handleCheckOut
    } = useMutation({
        mutationFn: checkOutOfSession,
        onError: handleCheckOutError,
        onSuccess: handleCheckOutSuccess
    })

    const onCheckIn = async () => {
        handleCheckIn(id)
    }

    const onCheckOut = async () => {
        handleCheckOut(id)
    }


    return { onCheckIn, onCheckOut }
}

export default useCheckIn
