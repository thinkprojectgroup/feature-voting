const { OAuth2Client } = require("google-auth-library");

const config = require("../config/keys");

const CLIENT_ID = config.client_id_1;
const client = new OAuth2Client(CLIENT_ID);

exports.validateToken = async (res, tokenId) => {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID //multiple clients: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    }).catch( err => 
      res.status(401).send("Verifing the token failed.").end()
    );
    console.log(ticket);
    if (ticket && ticket.payload.email_verified
              /*&& payload.hd === 'thinkproject.de')*/ //TODO add check for hd (hosted domain) for production
               && ticket.payload.aud === CLIENT_ID) {
      return ticket;
    }
    res.status(401).send("Invalid Token.");
    return null;
  }