const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { User, validateUser, validateBanRequest } = require("../models/user")
const checkAuth = require('../middleware/checkAuth')

router.get("/", checkAuth, async (req, res) => {
    //TODO: add auth middleware / maybe only return users with email
    const users = await User.find({deleted: false}).sort("dateCreated")

    res.send(users);
});

// Assign role included in req.body to user with provided email address
router.post("/:email", checkAuth, async (req, res) => {
    //TODO: add auth middleware
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOneAndUpdate({ email: req.params.email }, {
        $set: {
            role: req.body.role
        }
    }, { new: true, useFindAndModify: false })
    if (!user) return res.status(404).send("Invalid email")

    res.send(user)
})

// Set banned status of given user id to req.body.banned value
router.post("/ban/:id", checkAuth, async (req, res) => {
    //TODO: add auth middleware
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("UserId doesn't fit id schema")

    const { error } = validateBanRequest(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            banned: req.body.banned
        } 
    }, { new: true, useFindAndModify: false })
    if (!user) return res.status(404).send("Invalid id")

    res.send(user)
})

module.exports = router