import React from 'react'
import { useApp } from '../../../context/AppContext';
import { signOut } from '../../../store/auth';
import { useMutation, useQueryClient } from 'react-query';


function useAuth() {
    const client = useQueryClient();
    const { handleAlerts, navigate } = useApp();

    const handleSignOutSuccess = (data) => {
        navigate('/sign-in')
        client.setQueryData(['auth'], data)
        client.invalidateQueries(['auth'], { exact: true })
    }

    const handleSignOutError = () => {
        handleAlerts({})
    }

    const {
        mutate: handleSignOut,
        isLoading: signOutLoading
    } = useMutation({
        mutationFn: signOut,
        onSuccess: handleSignOutSuccess,
        onError: handleSignOutError
    })

    const onSignOut = async () => {
        try {
           handleSignOut()
        } catch(e) {
            console.error(e)
        }
    }

    return { onSignOut }
}

export default useAuth
