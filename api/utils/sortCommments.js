function sortComments(comments) {
    const sortedComments = [];
    const commentMap = {};

    comments.forEach(comment => {
        if (comment.replyTo === null || !commentMap[comment.replyTo]) {
            const newComment = { ...comment};
            newComment.replyTo = null;
            commentMap[newComment.id] =  [newComment];
        } else {
            if (commentMap[comment.replyTo]) {
                const array = commentMap[comment.replyTo]
                commentMap[comment.replyTo] = [...array, comment]
            } else {

            }
        }
    });

    console.log(commentMap)

    for (const key in commentMap) {
        for (let c of commentMap[key]) {
            sortedComments.push(c)
        }
    }

    return sortedComments;
}


module.exports = { sortComments }
