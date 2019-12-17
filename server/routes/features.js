const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const { Project } = require("../models/project")
const { validateFeature, validateSearch } = require("../models/feature")
const uploadImages = require("../middleware/imageUpload")

// Post new feature to given projectId. Request needs to be in form-data otherwise
// upload middleware will throw an error.
router.post("/:projectId", uploadImages, async (req, res) => {
    const { error } = validateFeature(req.body)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
        console.log("ProjectId doesn't fit id schema")
        return res.status(400).send("ProjectId doesn't fit id schema")
    }
    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({ _id: req.params.projectId, deleted: false })
    if (!project) {
        console.log("Invalid projectId")
        return res.status(404).send("Invalid projectId")
    }

    project.features.push({
        headline: req.body.headline,
        description: req.body.description,
        employeeIds: [],
        userIds: [],
        picturePaths: req.files.map(file => file.id),
        creator: "5df1205675aec022fc257e8f"
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

    if (result.nModified != 1) return res.status(404).send("FeatureId not found (or acceptedStatus was already true)")

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

    const project = await Project.findOne({ _id: req.params.projectId, deleted: false })
    if (!project) return res.status(404).send("projectId not found")

    //TODO add featureID invalid response

    const feature = project.features.id(req.params.featureId)
    if (!feature || feature.deleted) return res.status(404).send("featureId not found")

    res.send(feature)
});

// Search for feature headline/description by searchString
// NOTE: half written words don't return anything
router.get("/search/", async (req, res) => {
    const { error } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    var features = await Project.find(
        { $text: { $search: req.body.searchString } },
        { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })
    if (features.length == 0) return res.send("no results found")

    //TODO: Project.find returns Project -> return feature instead of project

    res.send(features);
});

// Delete specific feature for project & feature id
router.delete("/:projectId/:featureId", async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) return res.status(400).send("ProjectId doesn't fit id schema")
    if (!mongoose.Types.ObjectId.isValid(req.params.featureId)) return res.status(400).send("FeatureId doesn't fit id schema")

    // Using find & save instead of update for featureSchema.pre method to work properly
    const project = await Project.findOne({ _id: req.params.projectId, deleted: false })
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

    res.status(202).send(result)
})

module.exports = router;
