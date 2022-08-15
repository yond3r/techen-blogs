const router = require('express').Router();

const {Comment} = require('../models');

router.post('/', async (req, res) =>{
    try {
        const user_id = req.session.user_id;
        const {post_id, content} = req.body;

        if(!user_id || !post_id || !content){
            res.json({message: "sorry, some data is missing here! try again!"})
        }
        const newComment = await Comment.create ({
            content,
            post_id,
            user_id
        })
        res.status(200).json(newComment);
    }
        catch (err){
            res.status(500).json(err)
        }
})

module.exports = router;