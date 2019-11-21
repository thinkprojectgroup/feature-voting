const express = require('express');
const router = express.Router();
const { Project, validateProject } = require("../models/project")

router.get("/", async (req, res) => {
    const projects = await Project.find().sort("dateCreated")
    res.send(projects);
});

router.post("/", async (req, res) => {
    const { error } = validateProject(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const project = new Project({
        name: req.body.name || "default",
        features: []
    })
    await project.save()

    res.send(project)
})

module.exports = router;