const router = require('express').Router();

const {User} = require('../../models');

router.post('/create', async (req, res) =>{
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData)
});

} catch (err) {
    res.status(400).json(err);
}});

router.post('login', async (req, res) =>{
    try {
        const userData = await User.findOne({
            where: {username: req.body.username}
        })
        if(!userData) {
            res.status(400)({message: "Incorrect username and/or password, please true again."});
        }
        const truePassword = await userData.checkPassword(req.body.password);

        if(!truePassword) {
            res.status(400)({message: "Incorrect username and/or password, please true again."});
        }
        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true;
            res.status(200).json({message: "Logged in (-:"})
        });
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) =>{
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;