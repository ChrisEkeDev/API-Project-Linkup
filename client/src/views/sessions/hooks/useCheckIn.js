import { useApp } from '../../../context/AppContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { checkInToSession, checkOutOfSession } from '../../../store/sessions';

function useCheckIn() {
    const { id } = useParams();
    const client = useQueryClient();
    const { handleAlerts } = useApp();

    const handleSuccess = (data) => {
        handleAlerts(data)
        client.invalidateQueries(['check-in-status'])
        client.invalidateQueries(['session-checkIns'])
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleCheckIn,
        isLoading: checkInLoading
    } = useMutation({
        mutationFn: checkInToSession,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const {
        mutate: handleCheckOut,
        isLoading: checkOutLoading
    } = useMutation({
        mutationFn: checkOutOfSession,
        onSuccess: handleSuccess,
        onError: handleError
    })

    const onCheckIn = async () => {
        try {
            handleCheckIn(id)
        } catch (e) {
            console.error(e)
        }
    }

    const onCheckOut = async () => {
        try {
            handleCheckOut(id)
        } catch (e) {
            console.error(e)
        }
    }



    return { onCheckIn, onCheckOut, checkInLoading, checkOutLoading }
}

export default useCheckIn
