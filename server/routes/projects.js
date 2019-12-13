const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const { Project, validateProject } = require("../models/project")

router.get("/", async (req, res) => {
    // const projects = await Project.find({deleted: false}).sort("dateCreated")
    const projects = await Project.aggregate([
        { $match: {deleted: false}},
        { $project: {
            features: {
                $filter: {
                    input: '$features',
                    as: 'feature',
                    cond: { 
                        $cmp: ['$$feature.deleted', true]
                    }
            }},
            name: true,
            __v: true
        }}
    ])

    res.send(projects);
});

router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("ProjectId doesn't fit id schema")

    const project = await Project.aggregate([
        { $match: {_id: mongoose.Types.ObjectId(req.params.id), deleted: false}},
        { $project: {
            features: {
                $filter: {
                    input: '$features',
                    as: 'feature',
                    cond: { 
                        $cmp: ['$$feature.deleted', true]
                    }
            }},
            name: true,
            __v: true
        }}
    ])
    if(project.length == 0) return res.status(404).send("Invalid projectId") 

    res.send(project[0]);
});

router.get("/name/:name", async (req, res) => {

    const project = await Project.aggregate([
        { $match: {name: req.params.name, deleted: false}},
        { $project: {
            features: {
                $filter: {
                    input: '$features',
                    as: 'feature',
                    cond: { 
                        $cmp: ['$$feature.deleted', true]
                    }
            }},
            name: true,
            __v: true
        }}
    ])
    if(project.length == 0) return res.status(404).send("Invalid project name") 

    res.send(project[0]);
});

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
    } catch(err) {
        if (err.code == 11000) {
            res.status(400).send("Project name already in use")
        } else {
            throw err
        }
    }
})

router.delete("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("projectId doesn't fit id schema")

    var project = await Project.findOneAndUpdate({_id: req.params.id, deleted: false},{"$set":{"deleted": true }},{useFindAndModify: false})
    if (!project) return res.status(404).send("projectId not found")
   
    res.status(202).send(project)
})

module.exports = router;
