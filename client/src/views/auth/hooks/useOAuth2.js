import React from 'react'

function useOAuth2() {

    const googleAuth = (e) => {
        e.preventDefault()
        window.location.href = 'http://localhost:8000/api/auth/google';
    }

    return {googleAuth}
}

export default useOAuth2
