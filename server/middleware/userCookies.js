const { User } = require("../models/user")
const mongoose = require("mongoose")

// Check if there is a valid userId cookie in the request, if not create a new user and set id as cookie
module.exports = async (req, res, next) => {
    var userId = req.cookies["userId"];
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        const cookieOptions = {
            httpOnly: true,
            expires: new Date('Tue Jul 01 2040 06:01:11 GMT-0400 (EDT)')
        }

        const deviceHash = "asdfk438Z3223jGt8gs" //TODO: get hash from req

        // Try finding userId by deviceHash instead
        var user = await User.findOne({ deviceHash: deviceHash })
        if (!user) {
            // User not found by cookie or by id, create new user
            user = new User({})
            await user.save()

            req.userId = userId
            res.cookie('userId', user._id, cookieOptions);

            return next()
        } else {
            // User found by deviceHash
            req.userId = userId
            res.cookie('userId', user._id, cookieOptions);

            return next()
        }
    }
    req.userId = userId
    next()
}
