const router = require('express').Router();

const homeRoutes = require('./homepageRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const loginRoutes = require('./loginRoutes')
const commentRoutes = require('./commentRoutes')
const apiRoutes = require('./api')
const userRoutes = require('./api/userRoutes')

router.use('/', homeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)
router.use('/login', loginRoutes)
router.use('/signup', userRoutes)
router.use('/commentRoutes', commentRoutes)

module.exports = router;
