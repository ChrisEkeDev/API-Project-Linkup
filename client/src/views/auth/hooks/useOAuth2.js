import React from 'react'

function useOAuth2() {

    const googleAuth = (e) => {
        e.preventDefault()
        window.location.href = 'http://localhost:8000/api/auth/google';
    }

    const appleAuth = (e) => {
        e.preventDefault()
        alert('Coming Soon')
    }

    return {googleAuth, appleAuth}
}

export default useOAuth2
