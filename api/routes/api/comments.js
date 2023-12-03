const express = require('express');
const router = express.Router();
const { Comment, Court, Session, Player, CheckIn } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateCreateComment } = require("./validation/expressValidations");
const { sortComments } = require('../../utils/sortCommments');
const { courtNotFound, sessionNotFound, commentNotFound, playerNotAuthorized } =require('./constants/responseMessages');


//**TESTING */
router.get('/', async(req, res) => {
    const comments = await Comment.findAll();
    return res.status(200).json({
        comments
    })
})

////////////////////////////////////////////////////////////////////

// Get Comments By Court

///////////////////
router.get('/courts/:courtId', async (req, res) => {
    const { courtId } = req.params;
    const court = await Court.findByPk(courtId);
    if(!court) {
        return res.status(404).json(courtNotFound)
    }

    const comments = await Comment.findAll({
        where: { courtId },
        include: [
            {
                model: Player
            }
        ]
    })

    return res.status(200).json({
        status: 200,
        message: "",
        data: comments,
        errors: {}
    })
})


////////////////////////////////////////////////////////////////////

// Get Comments By Session

///////////////////
router.get('/sessions/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const session = await Court.findByPk(sessionId);
    if(!session) {
        return res.status(404).json(sessionNotFound)
    }

    const comments = await Comment.findAll({
        where: { sessionId },
        include: [
            {
                model: Player
            }
        ]
    })

    return res.status(200).json({
        status: 200,
        message: "",
        data: comments,
        errors: {}
    })
})

//////////////////////////////////////////////////////////////////

// Create a Comment

//////////////////////////
router.post('/', requireAuth, validateCreateComment, async (req, res) => {
    const { id } = req.player;
    const { text, replyTo, courtId, sessionId } = req.body;
    const court = await Court.findByPk(courtId);
    const session = await Session.findByPk(sessionId);
    const checkIn = await CheckIn.findOne({
        where: { playerId: id, sessionId }
    })

    if (!checkIn) {
        return res.status(403).json(playerNotAuthorized)
    }

    if (!court) {
        return res.status(404).json(courtNotFound)
    }

    if (!session) {
        return res.status(404).json(sessionNotFound)
    }

    const comment = await Comment.create({
        playerId: id,
        courtId,
        sessionId,
        text,
        replyTo: replyTo ? replyTo : null
    })

    const newComment = await Comment.findByPk(comment.id, {
        include: [
            {
                model: Player
            }
        ]
    });


    return res.status(201).json({
        status: 201,
        message: "",
        data: newComment,
        errors: {}
    })
})

////////////////////////////////////////////////////////////

// Update a Comment

//////////////////
router.put('/:commentId', requireAuth, validateCreateComment, async(req, res) => {
    const { id } = req.player;
    const { commentId } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByPk(commentId);
    const playerAuthorized = id == comment.playerId;
    if (!comment) {
        return res.status(404).json(commentNotFound)
    }

    if (!playerAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    await comment.set({
        text
    })

    comment.save();

    const updatedComment = await Comment.findByPk(comment.id, {
        include: [
            {
                model: Player
            }
        ]
    });

    return res.status(200).json({
        status: 200,
        message: "",
        data: updatedComment,
        errors: {}
    })
})

///////////////////////////////////////////////////////////

// Delete a Comment

////////////
router.delete('/:commentId', requireAuth, async(req, res) => {
    const { id } = req.player;
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    const playerAuthorized = id == comment.playerId;
    if (!comment) {
        return res.status(404).json(commentNotFound)
    }

    if (!playerAuthorized) {
        return res.status(403).json(playerNotAuthorized)
    }

    comment.destroy();

    // const allComments = await Comment.findAll({
    //     where: { replyTo: commentId }
    // });

    // for (let c of allComments) {
    //     await c.set({
    //         replyTo: null
    //     })
    //     c.save();
    // }
    // allComments.forEach( async (comment) => {
    //     await comment.set({
    //         replyTo: null
    //     })
    //     comment.save();
    // })

    return res.status(200).json({
        status: 200,
        message: "",
        data: comment,
        errors: {}
    })
})

module.exports = router;
