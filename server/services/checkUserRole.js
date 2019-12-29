const { User } = require("../models/user");
const { validateToken } = require("../services/auth");

exports.checkUserRole = (tokenId) => {

    const ticket = validateToken(tokenId);
    const user = await User.findOne({email: ticket.payload.email});

    if(user.role === 'admin') return {user, role: 'admin'}
    else if (user.role === 'employee') return {user, role: 'employee'}
    else return {user: null, role: 'user'}
}