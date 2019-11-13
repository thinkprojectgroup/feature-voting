const projects = require('../routes/projects')

module.exports = function(app){
    app.use('/projects/', projects)
}
