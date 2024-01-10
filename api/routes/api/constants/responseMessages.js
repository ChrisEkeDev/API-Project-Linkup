const courtNotFound = {
    status: 404,
    message: "Court couldn't be found",
    data: null,
    error: "The 'courtId' is not recognized as a valid entity"
};

const likeNotFound = {
    status: 404,
    message: "Like couldn't be found",
    data: null,
    error: "The 'likeId' is not recognized as a valid entity"
}

const sessionNotFound = {
    status: 404,
    message: "Session couldn't be found",
    data: null,
    error: "The 'sessionId' is not recognized as a valid entity"
};

const commentNotFound = {
    status: 404,
    message: "Comment couldn't be found",
    data: null,
    error: "The 'commentId' is not recognized as a valid entity"
};


const playerNotAuthorized = {
    status: 403,
    message: "not authorized",
    data: null,
    error: "You are not authorized to make this request"
}

const teamNotFound = {
    status: 404,
    message: "Team couldn't be found",
    data: null,
    error: "The 'teamId' is not recognized as a valid entity"
}

const cantDeleteMembership = {
    status: 405,
    message: "Can't Delete Membership",
    data: null,
    error: "You can't delete your membership for a team you created"
}

const membershipNotFound = {
    status: 404,
    message: "Membership couldn't be found",
    data: null,
    error: "The memberhsip doesn't exist between that player and team"
}

const membershipAlreadyExists = {
    status: 403,
    message: "Membership already exists",
    data: null,
    error: "A memberhsip already exist between that player and team"
}

module.exports = {
    courtNotFound,
    likeNotFound,
    sessionNotFound,
    teamNotFound,
    commentNotFound,
    cantDeleteMembership,
    membershipNotFound,
    membershipAlreadyExists,
    playerNotAuthorized
}
