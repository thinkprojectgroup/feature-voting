const { OAuth2Client } = require("google-auth-library");

const config = require("../config/keys");

const CLIENT_ID = config.client_id_1;
const client = new OAuth2Client(CLIENT_ID);
const { User } = require("../models/user");

const validateToken = async idToken => {
  console.log("validateToken")
  const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID //multiple clients: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    //.then(resp => console.log("resp", resp))
    .catch(err => console.log("err validation", err));
      //res.status(401).send("Verifing the token failed.").end()
    
  console.log(ticket);
  if (
    ticket &&
    ticket.payload.email_verified && 
    /*&& payload.hd === 'thinkproject.de')*/ //TODO add check for hd (hosted domain) for production
    ticket.payload.aud === CLIENT_ID
  ) {
    return ticket;
  }
  //res.status(401).send("Invalid Token.");
  return null;
};

const checkUser = async loginPayLoad => {
  const user = await User.findOne({ email: loginPayLoad.email });
  //console.log("user", user)

  if (user.role == 'admin') return { user, role: 'admin' };
  else if (user.role == 'employee') return { user, role: 'employee' };
  else if (user.role == 'user') return {user, role: 'user'}

  return null
};

exports.validateToken = validateToken;
exports.checkUser = checkUser;
