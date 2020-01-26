const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models/user");
const CLIENT_ID = process.env.CLIENT_ID_1 || require("../config/keys").client_id_1;
const client = new OAuth2Client(CLIENT_ID);

const validateToken = async idToken => {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: CLIENT_ID //multiple clients as array: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  .catch(error => {
    console.log("token not verified")
  });

  if (ticket &&
      ticket.payload.email_verified && 
    /*&& payload.hd === 'thinkproject.de')*/ //TODO add check for hd (hosted domain) for production
      ticket.payload.aud === CLIENT_ID) {
    return ticket;
  }
  return null;
};

const isAdmin = async email => {
  var role = await getUserRole(email);

  if (role == "admin") {
    return role;
  }
};

const getUserRole = async email => {
  let user = await User.findOne({ email: email });
  
  if (user) return user.role

  return null
};

exports.validateToken = validateToken;
exports.getUserRole = getUserRole;
exports.isAdmin = isAdmin;
