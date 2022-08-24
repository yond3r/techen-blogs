const sequelize = require("../config/connection");

const {user, comment} = require("../models");

const user = [
    {
        username:"axe04",
        password:"password"
    },
    {
        username:"jovescoves",
        password:"passw0rd"
    }
]

const comment = [
    {
        UserId:1,
        content:"I really dig this the vibes of this new (old??? remastered???) tmnt game!",
    },
    {
        UserId:1,
        content:"wow, I am learning so much about game development.",
    },
    {
        UserId:2,
        content:"We are building a pixel-based rpg and I am so incredibly nervous, I'd (like to think) that I am a skilled artist. I've just never used tried pixel art before.",

        UserId:2,
        content:"Okay, I made a Very Cute pixel tree. Now I just need ... 400 more for our canvas for project 3.",
    },
]

const seedMe = async ()=> {
    await sequelize.sync({force:true});
    await user.bulkCreate(user, {individualHooks:true})
    await comment.bulkCreate(comment)
    process.exit(0)
}

seedMe()