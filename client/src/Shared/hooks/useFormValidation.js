import React, { useState, useEffect } from 'react'


function useFormValidation() {
    const [ formData, setFormData ] = useState({})
    const [ errors, setErrors ] = useState()
    const { name, email, password, confirmPassword } = formData;

    const handleFormInput = (x) => {
        setFormData((prev) => ({ ...prev, [x.target.id]: x.target.value }));
    }

    const handleErrors = (newErrors) => {
        const newState = { ...errors, ...newErrors };
        setErrors(newState)
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

    return [ formData, errors, handleErrors, handleFormInput ]
}

export default useFormValidation
