const express = require('express');
const router = express.Router();
const { Comment, validateComment } = require("../models/comment")

router.get("/", async (req, res) => {
    const comments = await Comment.find().sort("dateCreated")
    res.send(comments);
});

router.post("/", async (req, res) => {
    const { error } = validateComment(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const comment = new Comment({
        author: req.cookies['userId'],
        content: req.body.content,
        featureId: req.body.featureId,
    })
    await comment.save()

    res.send(comment)
})

module.exports = router