export const signUpAlerts = {
    signUpSuccess: {
        status: 'success',
        title: 'Sign up success',
        message: 'Your account was created successfully.'
    },
    signUpFailure: {
        status: 'fail',
        title: 'Sign up problem',
        message: 'There was a problem signing you up. Check your credentials.'
    }
}

export const signInAlerts = {
    signInSuccess: {
        status: 'success',
        title: 'Sign in success',
        message: 'Signed in successfully.'
    },
    signInFailure: {
        status: 'fail',
        title: 'Sign in problem',
        message: 'There was a problem signing you in. Check your credentials.'
    }
}

export const signOutAlerts = {
    signOutSuccess: {
        status: 'success',
        title: 'Sign out success',
        message: 'Signed out successfully.'
    },
    signOutFailure: {
        status: 'fail',
        title: 'Sign out problem',
        message: 'There was a problem signing you you. Try again.'
    }
}

export const sessionAlerts = {
    sessionRestored: {
        status: 'success',
        title: 'Session restored',
        message: 'We have successfully restored your session from last time.'
    },
    noSessionFound: {
        status: 'warning',
        title: 'No session found.',
        message: 'We couldn\'t find a session for you from last time.'
    }
}

export const sessionsAlerts = {
    sessionsNotFound: {
        status: 'fail',
        title: 'Couldn\'t retrieve sessions',
        message: 'We couldnt get any of the sessions.'
    },
    sessionNotFound: {
        status: 'fail',
        title: 'Session not found',
        message: 'We couldn\'t find a session with that id number.'
    },
    couldntVerifyAddress: {
        status: 'fail',
        title: 'Address not verified',
        message: 'We couldn\'t verify the address you entered.'
    },
    createSessionError: {
        status: 'fail',
        title: 'Error',
        message: 'We couldn\'t create the session for you.'
    },
    createSessionSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Your session was created successfully.'
    },
    updateSessionSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Your session was updated successfully.'
    },
    updateSessionError: {
        status: 'fail',
        title: 'Error',
        message: 'We couldn\'t update the session for you.'
    },
    deleteSessionSuccess: {
        status: "success",
        title: "Success",
        message: "Your session was deleted successfully."
    },
    deleteSessionError: {
        status: "fail",
        title: "Error",
        message: "Your session was deleted successfully."
    },
    checkInSuccess: {
        status: "success",
        title: "Success",
        message: "You've been checked in successfully."
    },
    checkInError: {
        status: "fail",
        title: "Error",
        message: "We couldn\'t check you in successfully."
    }

}
