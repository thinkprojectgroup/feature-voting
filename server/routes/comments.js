const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const { Comment, validateComment, validateFlaggedComment } = require("../models/comment")
const { Project, validateProject } = require("../models/project")
const { validateSearch } = require("../models/feature")
const checkAuth = require("../middleware/checkAuth")

// Get all unaccepted comments
router.get("/", checkAuth, async (req, res) => {
    var comments = await Comment.find({ accepted: false, deleted: false }).sort("dateCreated")

    res.send(comments);
});

// Search for comments by searchString
// NOTE: half written words don't return anything
router.get("/search/", async (req, res) => {
    const { error } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    var comments = await Comment.find(
        { $text: { $search: req.body.searchString } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })
    if (comments.length == 0) return res.send("no results found")

    res.send(comments);
});

// Get accepted comments by featureId
router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("FeatureId doesn't fit id schema")

    const feature = await Project.findOne({ "features._id": req.params.id })
    if (!feature || feature.deleted) return res.status(404).send("featureId not found")

    const comments = await Comment.find({ featureId: req.params.id, deleted: false, accepted: true }).sort("dateCreated")

    res.send(comments);
});

// Post a new comment to given featureId
router.post("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("FeatureId doesn't fit id schema")

    const { error } = validateComment({
        content: req.body.content,
        name: req.body.name
    })
    if (error) return res.status(400).send(error.details[0].message)

    const project = await Project.findOne({ "features._id": req.params.id }, {"features.$." : 1, name: 1, displayName: 1})
    if (!project || project.features[0].deleted) return res.status(404).send("featureId not found")

    const comment = new Comment({
        author: req.userId,
        content: req.body.content,
        featureId: req.params.id,
        name: req.body.name,
        imageUrls: req.body.imageUrls,
        projectName: project.name,
        featureName: project.features[0].headline,
        projectDisplayName: project.displayName
    })
    await comment.save()

    res.status(201).send(comment)
}) 

// Switch comments accepted status by it's id
router.patch("/:id", checkAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("commentId doesn't fit id schema")

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        var comment = await Comment.findOneAndUpdate(
            { _id: req.params.id, deleted: false, accepted: false },
            { "$set": { "accepted": true } },
            { new: true, useFindAndModify: false })
            .session(session)
        if (!comment) return res.status(404).send("commentId not found (or already accepted)")

        const project = await Project.findOne(
            { "features._id": comment.featureId })
            .session(session)
        const feature = project.features.id(comment.featureId).commentCount++
        await project.save()

        await session.commitTransaction();
        res.status(200).send(comment)
    } catch (err) {
        await session.abortTransaction();
        throw err
    } finally {
        session.endSession();
    }
})

// Delete comments by id
router.delete("/:id", checkAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("commentId doesn't fit id schema")

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            { "$set": { "deleted": true } },
            { new: true, useFindAndModify: false })
            .session(session)
        if (!comment) return res.status(404).send("commentId not found")

        // Only adjust commentCount in feature if comment has been accepted before.
        if(comment.accepted === true) { 
            const project = await Project.findOne(
                { "features._id": comment.featureId })
                .session(session)
            const feature = project.features.id(comment.featureId)
            feature.commentCount--
    
            await project.save()
        }
        
        await session.commitTransaction();

        res.status(200).send(comment)
    } catch (err) {
        await session.abortTransaction();
        throw err
    } finally {
        session.endSession();
    }
})

module.exports = router
