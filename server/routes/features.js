const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature } = require("../models/feature")

router.post("/:projectId", async (req, res) => {
    const { error } = validateFeature(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({_id: req.params.projectId, deleted: false})
    if (!project) return res.status(404).send("Invalid projectId")

    project.features.push({
        headline: req.body.headline,
        description: req.body.description,
        employeeIds: [],
        userIds: [],
        creator: req.body.creatorId
    })
    await project.save()

    res.status(201).send(project)
})

router.get("/:projectId/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.findOne({_id: req.params.projectId, deleted: false})
    if (!project) return res.status(404).send("projectId not found")

    //TODO add featureID invalid response

    const feature = project.features.id(req.params.featureId)
    if (!feature || feature.deleted) return res.status(404).send("featureId not found")

    res.send(feature)
});

router.delete("/:projectId/:featureId", async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({_id: req.params.projectId, deleted: false})
    if (!project) return res.status(404).send("Invalid projectId")

    const feature = await project.features.id(req.params.featureId)
    if (!feature || feature.deleted) return res.status(404).send("featureId not found")

    const result = await Project.findOneAndUpdate(
        { "_id": req.params.projectId, "features._id": req.params.featureId },
        { 
            "$set": {
                "features.$.deleted": true
            }
        },
    );

    await project.save()

    res.status(201).send(result)
})

module.exports = router;
