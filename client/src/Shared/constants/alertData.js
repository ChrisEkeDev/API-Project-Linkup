export const signUpAlerts = {
    signUpSuccess: {
        status: 'success',
        title: "Sign up success",
        message: "Your account was created successfully."
    },
    signUpFailure: {
        status: 'fail',
        title: "Sign up problem",
        message: "There was a problem signing you up. Check your credentials."
    }
}

export const signInAlerts = {
    signInSuccess: {
        status: 'success',
        title: "Sign in success",
        message: "Signed in successfully."
    },
    signInFailure: {
        status: 'fail',
        title: "Sign in problem",
        message: "There was a problem signing you in. Check your credentials."
    }
}

export const signOutAlerts = {
    signOutSuccess: {
        status: 'success',
        title: "Sign out success",
        message: "Signed out successfully."
    },
    signOutFailure: {
        status: 'fail',
        title: "Sign out problem",
        message: "There was a problem signing you you. Try again."
    }
}

export const sessionAlerts = {
    sessionRestored: {
        status: 'success',
        title: "Session restored",
        message: "We have successfully restored your session from last time."
    },
    noSessionFound: {
        status: 'warning',
        title: "No session found.",
        message: "We couldn't find a session for you from last time."
    }
}
