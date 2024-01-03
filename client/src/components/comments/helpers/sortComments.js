export const sortComments = (comments) => {
    const sortedComments = [];
    const commentMap = {};

    comments.forEach(comment => {
        if (comment.replyTo === null || !commentMap[comment.replyTo]) {
            commentMap[comment.id] =  [comment];
        } else {
            const array = commentMap[comment.replyTo]
            commentMap[comment.replyTo] = [...array, comment]
        }
    });

    for (const key in commentMap) {
        for (let c of commentMap[key]) {
            sortedComments.push(c)
        }
    }

    return sortedComments;
}
