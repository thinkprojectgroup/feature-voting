const express = require('express');
const router = express.Router();
const { Project } = require("../models/project")

router.get("/", (req, res) => {
    const projects = Project.find().sort

    res.send("testest");
});

router.post("/", async (req, res) => {
    // TODO: validation

    const project = new Project({
        name: req.body.name || "default",
        features: []
    })
    await project.save()

    res.send(project)
})

module.exports = router;