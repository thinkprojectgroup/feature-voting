const { User } = require("../models/user")
const mongoose = require("mongoose")

// Check if there is a valid userId cookie in the request, if not create a new user and set id as cookie
module.exports = async (req, res, next) => {
    var userId = req.userId;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        // TODO: only create new user if cookie permission is given
        user = new User({})
        await user.save()
        res.cookie('userId', user._id, { httpOnly: true });
        req.userId = user._id
        return next()
    }
    req.userId = userId
    next()
}