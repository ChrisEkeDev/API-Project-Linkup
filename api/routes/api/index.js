const router = require('express').Router();
const authRouter = require('./auth.js');
const playerRouter = require('./players.js');
const teamRouter = require('./teams.js');
const sessionsRouter = require('./sessions.js');
const sessionImageRouter = require('./sessionImages.js');
const membershipRouter = require('./memberships.js');
const checkInRouter = require('./checkIn.js');
const placesRouter = require('./places.js');
const commentRouter = require('./comments.js')
const likeRouter = require('./likes.js')

const { restoreUser } = require('../../utils/jwt.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser)

router.use('/auth', authRouter);

router.use('/players', playerRouter);

router.use('/teams', teamRouter);

router.use('/sessions', sessionsRouter);

router.use('/session-images', sessionImageRouter);

router.use('/memberships', membershipRouter);

router.use('/check-ins', checkInRouter);

router.use('/places', placesRouter);

router.use('/comments', commentRouter);

router.use('/likes', likeRouter);



module.exports = router;
