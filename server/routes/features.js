const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature, validateSearch, cleanFeatures } = require("../models/feature")
const { Comment, validateComment, validateFlaggedComment } = require("../models/comment")
const { User } = require("../models/user")
const checkAuth = require("../middleware/checkAuth")

// Post new feature to given projectId. Request can include base64 imageData to save images.
router.post("/:projectName", async (req, res) => {
    const { error } = validateFeature({
        headline: req.body.headline,
        description: req.body.description
    })
    if (error) return res.status(400).send(error.details[0].message)

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({ name: req.params.projectName, deleted: false })
    if (!project) {
        return res.status(404).send("Invalid projectName")
    }

    const feature = {
        headline: req.body.headline,
        description: req.body.description,
        employeeIds: [],
        userIds: [],
        imageUrls: req.body.imageUrls,
        creator: req.userId
    }

    project.features.push(feature)
    await project.save()

    res.status(201).send(feature)
})

// Patch request to set acceptedStatus=true for given featureId
router.patch("/accept/:featureId", checkAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const result = await Project
        .updateOne(
            { "features._id": req.params.featureId },
            { "$set": { "features.$.acceptedStatus": true } })

    if (result.nModified != 1) return res.status(404).send("FeatureId not found (or acceptedStatus was already true)")

    res.status(204).send()
})

// Patch request to handle vote on given featureId
router.patch("/vote/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.findOne({ "features._id": req.params.featureId })
    if (!project) return res.status(404).send("Invalid featureId")

    var feature = project.features.id(req.params.featureId)

    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).send("User id not found")

    if (user.role === "admin" || user.role === "employee") {
        const index = feature.employeeIds.indexOf(userId)
        if (index === -1) {
            feature.employeeIds.push(userId)
        } else {
            feature.employeeIds.splice(index, 1)
        }
    } else {
        const index = feature.userIds.indexOf(userId)
        if (index === -1) {
            feature.userIds.push(userId)
        } else {
            feature.userIds.splice(index, 1)
        }
    }

    await project.save()

    feature = feature.toObject() //Turn feature to mutable object
    cleanFeatures([feature], userId)

    res.send(feature)
})

// Get specific feature for project & feature id
router.get("/:projectName/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.findOne({ name: req.params.projectName, deleted: false })
    if (!project) return res.status(404).send("projectName not found")

    var feature = project.features.id(req.params.featureId)
    if (!feature || feature.deleted) return res.status(404).send("featureId not found")

    feature = feature.toObject() //Turn feature to mutable object
    cleanFeatures([feature], req.userId)

    res.send(feature)
});

// Search for feature headline/description by searchString
// NOTE: half written words don't return anything
router.get("/search/", async (req, res) => {
    const { error } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const projects = await Project.find (
        { $text: { $search: req.body.searchString } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    var features = []
    projects.forEach(project => {
        const fts = project.features.map(ft => ft.toObject())
        features = features.concat(fts)
    })

    cleanFeatures(features, req.userId)

    res.send(features);
});

// Delete specific feature for project & feature id
router.delete("/:projectName/:featureId", checkAuth, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({ name: req.params.projectName });
    if (!project || project.deleted) return res.status(404).send("Invalid projectName");

    var feature = project.features.id(req.params.featureId);
    if (!feature || feature.deleted) return res.status(404).send("featureId not found");

    var tempComments = await Comment.find({ featureId: feature.id, deleted: false})
    for(var comment of tempComments){
        comment.deleted = true
        await comment.save()
    }
    
    feature.deleted = true;
    await project.save();

    res.status(202).send(feature);
})

module.exports = router;
