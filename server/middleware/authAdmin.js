const { User } = require("../models/user");
const { validateToken } = require("../models/auth");

module.exports = async (req, res, next) => {
    const tokenId = await req.body.idToken;

    if(!tokenId) {
        res.status(400).send("Token required. Please Login first.");
        return next();
    }
    
    const ticket = validateToken(tokenId);
    const user = await User.findOne({email: ticket.payload.email});
    console.log(user);

    if(user.role === 'admin') res.status(200).send('MW: Authorized a admin.')
    else res.status(401).send('Unauthorized. Admin rights required.')

    next();
}