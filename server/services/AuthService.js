const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID_1 || require("../config/keys").client_id_1;
const client = new OAuth2Client(CLIENT_ID);
const { User } = require("../models/user");

const validateToken = async idToken => {
  const ticket = await client
    .verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID //multiple clients: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    //.then(resp => console.log("resp", resp))
    .catch(err => null);
  //res.status(401).send("Verifing the token failed.").end()

  console.log(ticket);
  if (
    ticket &&
    ticket.payload.email_verified && //TODO add check for hd (hosted domain) for production
    /*&& payload.hd === 'thinkproject.de')*/ ticket.payload.aud === CLIENT_ID
  ) {
    return ticket;
  }
  //res.status(401).send("Invalid Token.");
  return null;
};

exports.validateToken = validateToken;
