import { useEffect, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useDispatch } from 'react-redux';
import { thunkSignUpPlayer } from '../../../store/auth';

const useSignUp = () => {
    const dispatch = useDispatch();
    const { navigate, setLoading, handleAlerts } = useApp();
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

    const onSignUp = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await dispatch(thunkSignUpPlayer(formData));
            handleAlerts(res)
            if (res.status >= 400) {
                throw new Error();
            } else {
                navigate('/enable-location')
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const errors = {};
        if (name && name.trim().length === 0) {
            errors.name = 'Please enter a Name';
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
        formData,
        handleInput,
        onSignUp,
    }

}

export default useSignUp;
