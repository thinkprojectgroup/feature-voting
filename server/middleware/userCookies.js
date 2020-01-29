const { User } = require("../models/user")
const mongoose = require("mongoose")

// Check if there is a valid userId cookie in the request, if not create a new user and set id as cookie
module.exports = async (req, res, next) => {
    var userId = req.cookies["userId"];
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        const cookieOptions = {
            httpOnly: true,
            expires: new Date('Tue Jul 01 2050 06:01:11 GMT-0400 (EDT)')
        }

        const deviceHash = req.get('Hash')
        // Try finding userId by deviceHash instead
        const user = await User.findOne({ deviceHash: deviceHash })
        if (!user) {
            // User not found by cookie or by id, create new user
            const newUser = new User({ deviceHash: deviceHash })
            await newUser.save()

            req.userId = newUser._id
            res.cookie('userId', newUser._id, cookieOptions);

            return next()
        } else {
            // User found by deviceHash
            req.userId = user._id
            res.cookie('userId', user._id, cookieOptions);

            return next()
        }
    }
    req.userId = userId
    next()
}
