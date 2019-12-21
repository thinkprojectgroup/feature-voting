//TODO Change with cors module
module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //TODO update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === "OPTIONS") {
      return res.status(200);
    }

    next();
}