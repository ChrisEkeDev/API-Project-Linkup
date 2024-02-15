import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useMutation, useQueryClient } from 'react-query';
import { signUp } from '../../../store/auth';

const useSignUp = () => {
    const client = useQueryClient();
    const { navigate } = useApp();
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [ errors, setErrors ] = useState({})

    const { name, email, password, confirmPassword } = formData;

    const handleInput = (x) => {
        setFormData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        setErrors(newState)
    }

    const handleSuccess = (data) => {
        client.setQueryData(['auth'], data.data)
        client.invalidateQueries(['auth'], { exact: true })
        navigate('/search')
    }

    const onSignUp = async (e) => {
        e.preventDefault();
        try {
            handleSubmit(formData)
        } catch (e) {
            console.error(e)
        }
    }

    const {
        mutate: handleSubmit,
        isLoading: signUpLoading
    } = useMutation({
        mutationFn: signUp,
        onError: handleErrors,
        onSuccess: handleSuccess
    })

    useEffect(() => {
        const errors = {};
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
    }, [formData])

    return {
        errors,
        signUpLoading,
        formData,
        handleInput,
        onSignUp,
    }

}

export default useSignUp;
