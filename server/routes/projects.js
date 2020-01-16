const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const { Project, validateProject } = require("../models/project")
const { validateToken, userCheck } = require('../services/AuthService')
const { cleanFeatures } = require("../models/feature")
const { Comment, validateComment, validateFlaggedComment } = require("../models/comment")


// Get all projects
router.get("/", async (req, res) => {
    const idToken = req.body.idToken;

    const loginTicket = validateToken(idToken);

    const projects = await Project.aggregate([
        { $match: { deleted: false } },
        {
            $project: {
                features: {
                    $filter: {
                        input: '$features',
                        as: 'feature',
                        $and: [
                            { $ne: ['$$feature.deleted', true] },
                            { $eq: ['$$feature.acceptedStatus', true] }
                        ]
                    }
                },
                name: true,
                __v: true
            }
        }
    ])

    projects.forEach(project => {
        cleanFeatures(project.features, req.userId)
    })

    res.send(projects);
});

// Get project with accepted features by id
router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("ProjectId doesn't fit id schema")

    var project = await Project.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id), deleted: false } },
        {
            $project: {
                features: {
                    $filter: {
                        input: '$features',
                        as: 'feature',
                        $and: [
                            { $ne: ['$$feature.deleted', true] },
                            { $eq: ['$$feature.acceptedStatus', true] }
                        ]
                    }
                },
                name: true,
                __v: true
            }
        }
    ])
    if (project.length == 0) return res.status(404).send("Invalid projectId")
    project = project[0]

    cleanFeatures(project.features, req.userId)

    res.send(project);
});

// Get project with accepted features by name instead of id, 
// NOTE: name is case sensitive
router.get("/name/:name", async (req, res) => {
    var project = await Project.aggregate([
        { $match: { name: req.params.name, deleted: false } },
        {
            $project: {
                features: {
                    $filter: {
                        input: '$features',
                        as: 'feature',
                        $and: [
                            { $ne: ['$$feature.deleted', true] },
                            { $eq: ['$$feature.acceptedStatus', true] }
                        ]
                    }
                },
                name: true,
                __v: true
            }
        }
    ])
    if (project.length == 0) return res.status(404).send("Invalid project name")
    project = project[0]

    cleanFeatures(project.features, req.userId)

    res.send(project);
});

// Get Project with all unaccepted features by name
// NOTE: name is case sensitive
router.get("/unaccepted/:name", async (req, res) => {
    //TODO: authentication, only for admin

    var project = await Project.aggregate([
        { $match: { name: req.params.name, deleted: false } },
        {
            $project: {
                features: {
                    $filter: {
                        input: '$features',
                        as: 'feature',
                        $and: [
                            { $ne: ['$$feature.deleted', true] },
                            { $eq: ['$$feature.acceptedStatus', true] }
                        ]
                    }
                },
                name: true,
                __v: true
            }
        }
    ])
    if (project.length == 0) return res.status(404).send("Invalid project name")
    project = project[0]

    res.send(project);
});

// Create a new project, project names have to be unique
router.post("/", async (req, res) => {
    const { error } = validateProject(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const project = new Project({
            name: req.body.name,
            features: []
        })
        await project.save()

        res.status(201).send(project)
    } catch (err) {
        if (err.code == 11000) {
            res.status(400).send("Project name already in use")
        } else {
            throw err
        }
    }
})

// Delete project by id
router.delete("/:id", async (req, res) => {
    //TODO: authentication, only for admin
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("projectId doesn't fit id schema")

    var project = await Project.findOneAndUpdate(
        { _id: req.params.id, deleted: false },
        { "$set": { "deleted": true } },
        { useFindAndModify: false, new: true }
    )

    if (!project) return res.status(404).send("projectId not found")

    for(var feature of project.features){
        feature.deleted = true
        var tempComments = await Comment.find({ featureId: feature.id, deleted: false})
        for(var comment of tempComments){
            comment.deleted = true
            await comment.save()
        }
    }
    await project.save()

    res.status(202).send(project)
})

module.exports = router;
