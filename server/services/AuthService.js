
export default class AuthService {

    async checkUserRole(tokenId) {

        const ticket = validateToken(tokenId);
        const user = await User.findOne({email: ticket.payload.email});
    
        if(user.role === 'admin') return {user, role: 'admin'}
        else if (user.role === 'employee') return {user, role: 'employee'}
        else return {user: null, role: 'user'}
    }

    async validateToken (res, tokenId) {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: CLIENT_ID //multiple clients: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        }).catch( err => null
          //res.status(401).send("Verifing the token failed.").end()
        );
        console.log(ticket);
        if (ticket && ticket.payload.email_verified
                  /*&& payload.hd === 'thinkproject.de')*/ //TODO add check for hd (hosted domain) for production
                   && ticket.payload.aud === CLIENT_ID) {
          return ticket;
        }
        //res.status(401).send("Invalid Token.");
        return null;
      }
}   