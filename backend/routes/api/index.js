const router = require('express').Router();
const sessionRouter = require('./session.js');
const userRouter = require('./users.js');
const groupRouter = require('./groups.js');
const venueRouter = require('./venues.js');
const eventRouter = require('./events.js')
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser)

router.use('/session', sessionRouter);

router.use('/users', userRouter);

router.use('/groups', groupRouter);

router.use('/venues', venueRouter);

router.use('/events', eventRouter)

module.exports = router;
