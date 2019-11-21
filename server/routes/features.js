const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature } = require("../models/feature")

// TODO: not sure if this is even needed
router.get("/:projectId", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("Invalid id")

    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(400).send("Invalid projectId")

    res.send(project.features)
});

router.post("/:projectId", async (req, res) => {
    const { error } = validateFeature(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("Invalid projectId")

    //TODO: remove comment once decision has been made

    // const result = await Project.updateOne({ _id: req.params.projectId }, {
    //     $push: {
    //         features: {
    //             headline: req.body.headline,
    //             description: req.body.description,
    //             employeeIds: ["5dd5696adce5622e749805c9", "5dd5696adce5622e749805c9", "5dd5696adce5622e749805c9"],
    //             userIds: ["5dd5696adce5622e749805c9"],
    //             creator: req.body.creatorId
    //         }
    //     }
    // })
    // if(result.nModified != 1) return res.status(404).send("Project with given id not found")
    // res.send("Feature added successfully")


    // const result = await Project.findByIdAndUpdate(req.params.projectId, {
    //     $push: {
    //                 features: {
    //                     headline: req.body.headline,
    //                     description: req.body.description,
    //                     employeeIds: ["5dd5696adce5622e749805c9", "5dd5696adce5622e749805c9", "5dd5696adce5622e749805c9"],
    //                     userIds: ["5dd5696adce5622e749805c9"],
    //                     creator: req.body.creatorId
    //                 }
    //             }
    // }, {new: true, useFindAndModify: false})


    const project = await Project.findById(req.params.projectId)
    if (!project) return res.status(400).send("Invalid projectId")

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
