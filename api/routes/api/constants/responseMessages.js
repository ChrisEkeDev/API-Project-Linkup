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

module.exports = {
    courtNotFound,
    likeNotFound,
    sessionNotFound,
    commentNotFound,
    playerNotAuthorized
}
