import { useEffect, useState } from 'react'
import { useApp } from '../../../context/AppContext';
import { useMutation, useQueryClient } from 'react-query';
import { signIn, signInGuest } from '../../../store/auth';
import { signInAlerts } from '../../../constants/alerts';


const useSignIn = () => {
    const client = useQueryClient();
    const { signInSuccess, signInFailure } = signInAlerts;
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
        console.log('Handling Error', error)
        // const newState = { ...errors, ...newErrors };
        // setErrors(newState)
        // if (Object.keys(newErrors).length > 0) {
        //     handleAlerts(signInFailure)
        // }
    }

    const handleSuccess = (data) => {
        console.log('Handling success', data)
        // client.setQueryData(['auth'], data);
        // client.invalidateQueries(['auth'], { exact: true })
        // navigate('/search')
        // handleAlerts(signInSuccess)
    }

    const {
        mutateAsync: handleSignIn,
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
        const res = await handleSignIn(formData)
        console.log(res)
    }

    const onSignInGuest = async (e) => {
        e.preventDefault();
        handleSignInGuest()
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
