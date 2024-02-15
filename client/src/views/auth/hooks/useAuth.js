import React from 'react'
import { useApp } from '../../../context/AppContext';
import { getAuth, signOut } from '../../../store/auth';
import { useQuery, useMutation, useQueryClient } from 'react-query';


function useAuth() {
    const client = useQueryClient();
    const { handleAlerts, navigate } = useApp();

    const {
        data: authData,
        isLoading: authLoading
      } = useQuery(['auth'], {
        queryFn: getAuth,
        retry: false
      });

      const auth = authData?.data;

    const handleSignOutSuccess = (data) => {
        navigate('/sign-in')
        handleAlerts(data)
        client.setQueryData(['auth'], data.data)
        client.invalidateQueries(['auth'], { exact: true })
    }

    const handleSignOutError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleSignOut
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

    return { auth, authLoading, onSignOut }
}

export default useAuth
