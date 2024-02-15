import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateProfile, deleteProfile } from '../../../store/auth'
import { useApp } from '../../../context/AppContext'

function useProfile() {
    const client = useQueryClient();
    const { auth, navigate, handleAlerts } = useApp();
    const [ errors, setErrors ] = useState({});
    const [ profileData, setProfileData ] = useState({
        id: auth.id,
        name: auth.name,
        email: auth.email,
        password: '',
        confirmPassword: ''
    });

    const handleInput = (x) => {
        setProfileData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleUpdateSuccess = (data) => {
        handleAlerts(data)
        client.setQueryData(['auth'], data.data)
        client.invalidateQueries(['auth'], { exact: true })
        navigate('/profile')
    }

    const handleDeleteSuccess = (data) => {
        handleAlerts(data)
        navigate('/sign-in')
        client.setQueryData(['auth'], data.data)
        client.invalidateQueries(['auth'], { exact: true })
    }

    const handleError = (error) => {
        handleAlerts(error)
    }

    const {
        mutate: handleUpdateProfile,
        isLoading: updateProfileLoading
    } = useMutation({
        mutationFn: updateProfile,
        onSuccess: handleUpdateSuccess,
        onError: handleError
    })

    const {
        mutate: handleDeleteProfile,
        isLoading: deleleProfileLoading
    } = useMutation({
        mutationFn: deleteProfile,
        onSuccess: handleDeleteSuccess,
        onError: handleError
    })

    const onUpdateProfile = async () => {
        try {
            handleUpdateProfile(profileData)
        } catch (e) {
            console.error(e)
        }
    }

    const onDeleteProfile = async () => {
        try {
            handleDeleteProfile()
        } catch (e) {
            console.error(e)
        }
    }

    const loading = deleleProfileLoading || updateProfileLoading;

    useEffect(() => {
        const errors = {};
        const { name, email, password, confirmPassword } = profileData;
        if (name && name.trim().length < 3) {
            errors.name = "Your name must be at least 3 characters."
        }
        if (email && (email.trim().length < 3 || email.trim().length > 256)) {
            errors.email = 'Email must be between 3 and 256 characters';
        }
        if (email && (!email.includes(".") || !email.includes("@"))) {
            errors.email = 'Please enter a valid email address';
        }
        if (password && password.trim().length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if ( password && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        setErrors(errors)
    }, [ profileData.name, profileData.email, profileData.password, profileData.confirmPassword ])

    return {
        profileData,
        errors,
        handleInput,
        loading,
        onUpdateProfile,
        onDeleteProfile
    }
}

export default useProfile
