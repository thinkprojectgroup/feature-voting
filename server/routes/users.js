const express = require('express');
const router = express.Router();
const { User, validateUser } = require("../models/user")

//TODO: maybe remove whole route, not sure if needed

router.get("/", async (req, res) => {
    const users = await User.find({deleted: false}).sort("dateCreated")
    res.send(users);
});

module.exports = router