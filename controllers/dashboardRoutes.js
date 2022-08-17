const { User, Post, Comment } = require('../models');
const router = require('express').Router();

//return posts
router.get('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
        }
        const dashboardData = await Post.findAll({
            attributes: ['id', 'user_id', 'title', 'content'],
            where: {
                user_id: req.session.user_id
            }
        })

        const userPosts = dashboardData.map(post => post.get({ plain: true }));

        res.render('/dashboard', {
            userPosts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        console.log(err)
        res.status(500).end()
    }

});

//editing posts
router.get('/singlepost/:id', async (req, res) => {
    try {
        const postDatabaseData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'content']
        })
        const postData = postDatabaseData.get({ plain: true });
        console.log(postData)

        res.render('singlePost', {
            postData,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//post dashboard
router.post('/', async (req, res) => {
    const user_id = req.session.user_id
    const { title, content } = req.body

    try {
        const newPost = await Post.create({
            title,
            content,
            user_id
        })

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
})

//update/edit post
router.put('/singlepost/id:', async (req, res) => {
    const { title, content } = req.body;
    console.log(title, content);

    try {
        const updatedPost = await Post.update({
            title,
            content
        },
            {
                where: {
                    id: req.params.id
                }
            })

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(removePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;