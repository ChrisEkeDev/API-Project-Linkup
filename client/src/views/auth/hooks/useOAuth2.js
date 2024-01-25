import React from 'react'
const isProduction = process.env.NODE_ENV === 'production';
function useOAuth2() {
    const googleAuth = (e) => {
        e.preventDefault()
        window.location.href = isProduction
            ? 'https://linkup-api-jw4b.onrender.com/api/auth/google'
            : 'http://localhost:8000/api/auth/google';
    }

    const appleAuth = (e) => {
        e.preventDefault()
        alert('Coming Soon')
    }

    return {googleAuth, appleAuth}
}

export default useOAuth2
