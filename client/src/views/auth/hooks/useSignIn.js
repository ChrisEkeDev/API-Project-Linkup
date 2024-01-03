import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { useDispatch } from 'react-redux';
import { thunkSignInPlayer } from '../../../store/auth';

const useSignIn = () => {
    const dispatch = useDispatch();
    const { navigate, setLoading } = useApp();

    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({})

    const { email, password } = formData;

    const handleInput = (x) => {
        setFormData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        setErrors(newState)
    }

    const onSignIn = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await dispatch(thunkSignInPlayer(formData));
            if (response.status === 200) {
                // handleAlerts(signInSuccess);
                navigate('/enable-location')
            } else {
                handleErrors(response.errors)
                throw new Error();
            }
        } catch (error) {
            // handleAlerts(signInFailure);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onSignInGuest = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = {email: 'pcartwirght@email.com', password: 'password1'};
            const response = await dispatch(thunkSignInPlayer(data));
            if (response.status === 200) {
                // handleAlerts(signInSuccess);
                navigate('/enable-location')
            } else {
                throw new Error();
            }
        } catch (error) {
            // handleAlerts(signInFailure);
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const errors = {};
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
        onSignIn,
        onSignInGuest
    }
}

export default useSignIn;
