const { validateToken, isAdmin } = require('../services/AuthService')

module.exports = async (req, res, next) => {
  const idToken = req.get('token');

  if (!idToken) return res.status(302).send('Login Required.')

  const loginTicket = await validateToken(idToken)
  if (!loginTicket) return res.status(500).send('Internal Server Error.')

  const authorised = await isAdmin(loginTicket.payload.email);

  if (!authorised) return res.status(401).send("Unauthorised.");

  next()
}