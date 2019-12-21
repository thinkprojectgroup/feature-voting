const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const headers = require('../middleware/headers')
const authorize = require('../middleware/authorize')
const auth = require('../routes/auth')
const projects = require('../routes/projects')
const features = require('../routes/features')
const users = require('../routes/users')
const comments = require('../routes/comments')
const error = require("../middleware/error")
const userCookies = require("../middleware/userCookies")

module.exports = function (app) {
    //app.use(headers);
    app.use(cors())      
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(userCookies)

    app.use("/api/public", express.static("server/public"))

    app.use("/api/auth/", auth)
    app.use('/api/projects/', projects)
    app.use("/api/features/", features)
    app.use("/api/users/", users)
    app.use("/api/comments/", comments)
    
    app.use(error)
}