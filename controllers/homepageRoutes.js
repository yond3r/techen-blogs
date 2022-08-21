const { User, Post, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const homepageData = await Post.findAll(
            {
                attributes: ['id', 'title', 'createdAt'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            }
        ).catch((err) => {
            res.json(err);
        })

        const posts = homepageData.map(post => post.get({ plain: true }));


        //render handlebars
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/single/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }
        const postDatabaseData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            attributes: ['id', 'content', 'createdAt'],
            include: {
                model: User,
                attributes: ['username']
            }
        })

        const postData = await postDatabaseData.get({ plain: true })
        const commentData = await commentDatabaseData.map(comment => comment.get({ plain: true }))
        postData.comments = commentData

        res.render('post', {
            postData,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;