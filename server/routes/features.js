const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature } = require("../models/feature")

// TODO: not sure if this is even needed
router.get("/:projectId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")

    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(404).send("Invalid projectId")

    // JUST FOR DEV
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send(project.features)
});

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

    res.send(project)
})

module.exports = router;
