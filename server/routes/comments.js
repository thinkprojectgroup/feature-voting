const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const { Comment, validateComment, validateFlaggedComment } = require("../models/comment")

router.get("/", async (req, res) => {
    var comments = await Comment.find({accepted: false}).sort("dateCreated")
    res.send(comments);
});

router.get("/:id", async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("FeatureId doesn't fit id schema")

    var comments = await Comment.find({featureId: req.params.id, deleted: false}).sort("dateCreated")
    if(!comments) return res.status(404).send("invalid featureId") 

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

    res.status(201).send(comment)
})

router.patch("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("commentId doesn't fit id schema")

    var comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).send("commentId not found")
   
    await Comment.updateOne({ _id: req.params.id },{"$set":{"accepted": !comment.accepted }}).catch(err => res.status(422).json(err));
 
    comment = await Comment.findById(req.params.id)
    res.status(200).send(comment)
})

router.delete("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("commentId doesn't fit id schema")

    var comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).send("commentId not found")
   
    await Comment.updateOne({ _id: req.params.id },{"$set":{"deleted": true }}).catch(err => res.status(422).json(err));

    res.status(202).send("resource successfully marked as deleted")
})

module.exports = router
