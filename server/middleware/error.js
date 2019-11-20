// Used as the last middleware function in routes.js this catches all errors thrown by 
// other middleware functions (mainly db connection issues)
module.exports = function(err, req, res, next){
    console.log(err.message, err)
    res.status(500).send("Something failed")
}