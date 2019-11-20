const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")

router.get("/", (req, res) => {
    res.send("testest");
});

router.post("/:projectId", async (req, res) => {
    // TODO: validation

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("Invalid id")

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


    const result = await Project.findById(req.params.projectId)
    result.features.push({
        headline: req.body.headline,
        description: req.body.description,
        employeeIds: ["5dd5696adce5622e749805c9"],
        userIds: ["5dd5696adce5622e749805c9"],
        creator: req.body.creatorId
    })
    await result.save()

    // res.send("Feature added successfully")
    res.send(result)
})

module.exports = router;
