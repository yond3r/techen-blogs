const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render('signup')
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;