const express = require("express")
const cookieParser = require("cookie-parser")
const projects = require('../routes/projects')
const features = require('../routes/features')
const users = require('../routes/users')
const comments = require('../routes/comments')
const error = require("../middleware/error")
const userCookies = require("../middleware/userCookies")
const images = require("../routes/images")
const cors = require("cors")

module.exports = function (app) {
  app.use(cors())

  app.use(express.json({ limit: "10mb" }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(userCookies)

  app.use(express.static('client/build'))

  app.use('/api/projects/', projects)
  app.use("/api/features/", features)
  app.use("/api/users/", users)
  app.use("/api/comments/", comments)
  app.use("/api/images/", images)
  
  app.get("/*", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../../client/build/index.html"),
      function(err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });

  app.use(error)
}
