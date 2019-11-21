const express = require('express');
const router = express.Router();
const { User, validateUser } = require("../models/user")

//TODO: maybe remove whole route, not sure if needed

router.get("/", async (req, res) => {
    const users = await User.find().sort("dateCreated")
    res.send(users);
});

// TODO: change to internal middleware function
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ _id: req.body.id })
    if (user) return res.status(400).send("User id already exists")

    user = new User({
        _id: req.body.id,
        role: req.body.role, // TODO: automatically assign
    })
    await user.save()

    res.send(user)
})

module.exports = router