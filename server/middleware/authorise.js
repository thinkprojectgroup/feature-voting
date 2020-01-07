const { User } = require("../models/user");
const { validateToken } = require("../services/AuthService");

module.exports = async (req, res, next) => {
    const tokenId = await req.body.idToken;
    
    if(!tokenId) {
        return res.status(401).send("Token required. Please Login first.");
        //return next();
    }
    
    const ticket = validateToken(tokenId);
    const user = await User.findOne({email: ticket.payload.email});
    console.log(user);

    if(user.role === 'admin') res.status(200).send('MW: Authorised a admin.')
    else await res.status(401).send('Unauthorised. Admin rights required.')

    next();
}