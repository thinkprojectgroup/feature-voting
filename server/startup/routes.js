const projects = require('../routes/projects')
const features = require('../routes/features')
const users = require('../routes/users')
const comments = require('../routes/comments')
const express = require("express")
const error = require("../middleware/error")

module.exports = function (app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/projects/', projects)
    app.use("/api/features/", features)
    app.use("/api/users/", users)
    app.use("/api/comments/", comments)

    app.use(error)
}
