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

export const authAlerts = {
    authRestored: {
        status: 'success',
        title: 'Success',
        message: 'You\'ve been logged in.'
    },
    authNotFound: {
        status: 'warning',
        title: 'Error.',
        message: 'Please log in to continue.'
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
        message: 'We couldn\'t delete the session for you.'
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

export const teamAlerts = {
    teamNotFound: {
        status: 'fail',
        title: 'Couldn\'t retrieve team',
        message: 'We couldnt get any of the team.'
    },
    teamNotFound: {
        status: 'fail',
        title: 'Team not found',
        message: 'We couldn\'t find a team with that id number.'
    },
    createTeamError: {
        status: 'fail',
        title: 'Error',
        message: 'We couldn\'t create the team for you.'
    },
    createTeamSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Your team was created successfully.'
    },
    updateTeamSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Your team was updated successfully.'
    },
    updateTeamError: {
        status: 'fail',
        title: 'Error',
        message: 'We couldn\'t update the team for you.'
    },
    deleteTeamSuccess: {
        status: "success",
        title: "Success",
        message: "Your team was deleted successfully."
    },
    deleteTeamError: {
        status: "fail",
        title: "Error",
        message: 'We couldn\'t update the team for you.'
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

export const membershipAlerts = {
    playerMembershipDeleteSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Player removed from the team successfully'
    },
    playerMembershipDeleteError: {
        status: 'fail',
        title: 'Error',
        message: 'There was a problem removing the player. Try again.'
    },
    authMembershipDeleteSuccess: {
        status: 'success',
        title: 'Success',
        message: 'You were removed from the team successfully'
    },
    authMembershipDeleteError: {
        status: 'fail',
        title: 'Error',
        message: 'There was a problem removing you from the team. Try again.'
    }
}

export const commentsAlerts = {
    commentCreateSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Comment created successfully'
    },
    commentCreateFail: {
        status: 'fail',
        title: 'Error',
        message: 'There was an issue creating your comment.'
    },
    commentUpdateSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Comment updated successfully'
    },
    commentUpdateFail: {
        status: 'fail',
        title: 'Error',
        message: 'There was an issue updating your comment.'
    },
    commentDeleteSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Comment deleted successfully'
    },
    commentDeleteFail: {
        status: 'fail',
        title: 'Error',
        message: 'There was an issue deleting your comment.'
    },
}


export const checkInAlerts = {
    checkInSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Check in successful.'
    },
    checkInError: {
        status: 'fail',
        title: 'Error',
        message: 'There was a problem checking you in.'
    },
    checkOutSuccess: {
        status: 'success',
        title: 'Success',
        message: 'Check out successful.'
    },
    checkOutError: {
        status: 'fail',
        title: 'Error',
        message: 'There was a problem checking you out.'
    }
}
