const courtNotFound = {
    status: 404,
    message: "Court couldn't be found",
    data: null,
    errors: {
        session: "The 'courtId' is not recognized as a valid entity"
    }
};

const likeNotFound = {
    status: 404,
    message: "Like couldn't be found",
    data: null,
    errors: {
        session: "The 'likeId' is not recognized as a valid entity"
    }
};

const sessionNotFound = {
    status: 404,
    message: "Session couldn't be found",
    data: null,
    errors: {
        session: "The 'sessionId' is not recognized as a valid entity"
    }
};

const commentNotFound = {
    status: 404,
    message: "Comment couldn't be found",
    data: null,
    errors: {
        session: "The 'commentId' is not recognized as a valid entity"
    }
};


const playerNotAuthorized = {
    status: 403,
    message: "not authorized",
    data: null,
    errors: {
        player: "You are not authorized to make this request"
    }
}

module.exports = {
    courtNotFound,
    likeNotFound,
    sessionNotFound,
    commentNotFound,
    playerNotAuthorized
}
