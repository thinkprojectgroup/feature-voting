const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature } = require("../models/feature")

/*// TODO: not sure if this is even needed
router.get("/:projectId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")

    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).send("Invalid projectId")

    res.send(project.features)
});*/

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
        creator: req.body.creatorId
    })
    await project.save()

    res.status(201).send(project)
})

router.get("/:projectId/:featureId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    const project = await Project.find({id: req.params.projectId, deleted: false})
    if (!project) return res.status(404).send("projectId not found")

    //TODO add featureID invalid response

    const feature = project.features.id(req.params.featureId)
    if (!feature) return res.status(404).send("featureId not found")

    res.send(feature)
});

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
