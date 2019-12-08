const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature } = require("../models/feature")

// Create a new feature in project with given projectId
router.post("/:projectId", async (req, res) => {
    const { error } = validateFeature(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).send("Invalid projectId")

    project.features.push({
        headline: req.body.headline,
        description: req.body.description,
        employeeIds: [],
        userIds: [],
        creator: req.cookies["userId"]
    })
    await project.save()

    res.status(201).send(project)
})

// Patch request to set acceptedStatus=true for given featureId
router.patch("/accept/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const result = await Project
        .updateOne(
            { "features._id": req.params.featureId },
            { "$set": { "features.$.acceptedStatus": true } })

    if(result.nModified != 1) return res.status(404).send("FeatureId not found (or acceptedStatus was already true)")

    res.status(204).send()
})

// Patch request to handle vote on given featureId
router.patch("/vote/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.findOne({ "features._id": req.params.featureId })
    if (!project) return res.status(404).send("Invalid projectId")

    const feature = project.features.id(req.params.featureId)
    if (!feature) return res.status(404).send("featureId not found")

    const userId = req.cookies["userId"]
    if (!userId) return res.status(400).send("userId cookie required")

    // TODO: decide if user or employee/admin

    const index = feature.userIds.indexOf(userId)
    if (index === -1) {
        feature.userIds.push(userId)
    } else {
        feature.userIds.splice(index, 1)
    }

    await project.save()
    res.send(feature)
})

// Get specific feature for project & feature id
router.get("/:projectId/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).send("projectId not found")

    //TODO add featureID invalid response

    const feature = project.features.id(req.params.featureId)
    if (!feature) return res.status(404).send("featureId not found")

    res.send(feature)
});

// Delete specific feature for project & feature id
router.delete("/:projectId/:featureId", async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).send("Invalid projectId")

    const feature = project.features.id(req.params.featureId)
    if (!feature) return res.status(404).send("featureId not found")

    project.features.pull(req.params.featureId)

    await project.save()

    res.status(201).send("successfully deleted feature")
})

module.exports = router;
