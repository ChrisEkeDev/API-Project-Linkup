import { useEffect, useState } from 'react'
import { useApp } from '../../../context/AppContext';
import { useMutation, useQueryClient } from 'react-query';
import { signIn, signInGuest } from '../../../store/auth';


const useSignIn = () => {
    const client = useQueryClient();
    const { navigate, handleAlerts } = useApp();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({})

    const handleInput = (x) => {
        setFormData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleErrors = (error) => {
        handleAlerts(error)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['auth'], data.data);
        client.invalidateQueries(['auth'], { exact: true })
        navigate('/search')
        handleAlerts(data)
    }

    const {
        mutate: handleSignIn,
        isLoading: signInLoading,
    } = useMutation({
        mutationFn: signIn,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

    const {
        mutate: handleSignInGuest,
        isLoading: signInGuestLoading,
    } = useMutation({
        mutationFn: signInGuest,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

    const onSignIn = async (e) => {
        e.preventDefault();
        try {
            handleSignIn(formData)
        } catch(e) {
            console.error(e)
        }
    }

    const onSignInGuest = async (e) => {
        e.preventDefault();
        try {
            handleSignInGuest()
        } catch(e) {
            console.error(e)
        }

    }

    useEffect(() => {
        const errors = {};
        const { email, password } = formData;
        if (email && (email.trim().length < 3 || email.trim().length > 256)) {
            errors.email = 'Email must be between 3 and 256 characters';
        }
        if (email && (!email.includes(".") || !email.includes("@"))) {
        errors.email = 'Please enter a valid email address';
        }
        if (password && password.trim().length < 6) {
        errors.password = 'Password must be at least 6 characters';
        }
        setErrors(errors)
    }, [formData])


    return {
        errors,
        formData,
        handleInput,
        signInLoading,
        signInGuestLoading,
        onSignIn,
        onSignInGuest
    }
}

export default useSignIn;
