const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const { Comment, validateComment } = require("../models/comment")

router.get("/", async (req, res) => {
    
    if(req.body.flagged){
        var comments = await Comment.find({flagged:true}).sort("dateCreated")
    }

    else var comments = await Comment.find().sort("dateCreated")
    res.send(comments);
});

router.post("/", async (req, res) => {
    const { error } = validateComment(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const comment = new Comment({
        author: req.body.authorId,
        content: req.body.content,
        featureId: req.body.featureId,
    })
    await comment.save()

    res.send(comment)
})

router.patch("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("commentId doesn't fit id schema")

    const comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).send("commentId not found")

    await Comment.updateOne({ _id: req.params.id },{"$set":{"flagged":true}}).catch(err => res.status(422).json(err));
 
    res.status(200).send(comment)
})

module.exports = router