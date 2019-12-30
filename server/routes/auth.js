const express = require("express");
const { User } = require("../models/user");
const { validateToken, checkUser } = require("../services/AuthService");
const router = express.Router();

router.post("/admin", async (req, res) => {
  const idToken = await req.body.idToken;
  if (!idToken) return res.status(302).send("Login required."); // HTTP Status 302 - Redirect to Loginpage

  const loginTicket = await validateToken(idToken);
  if (loginTicket) {
    const { user, role } = await checkUser(loginTicket.payload);
    //let user = await User.findOne({ email: loginTicket.payload.email });

    //TODO Edit Response Message
    if (user)
      if (role == 'admin') return res.status(200).send("authorised as admin");
      if (role == 'employee') return res.status(211).send('authorised as employee');
      
      return res.status(212).send('authorised as user')
  }
  res.status(401).send("Unauthorised.");
});

router.post("/", async (req, res) => {
  const idToken = await req.body.idToken;

  if (!idToken) res.status(302).send("Login required."); // HTTP Status 302 - Redirect to Loginpage

  const loginTicket = await validateToken(res, idToken);

  if (loginTicket) {
    const payload = loginTicket.payload;
    let user = await User.findOne({ email: payload.email });

    //TODO Dev Only - Every User logging in is admin
    if (!user) {
      user = new User({
        role: "admin",
        email: payload.email,
        name: payload.email
      });
      await user.save();
    }

    return res.status(200).send("authorised");
  }
  res.status(401).send("Unauthorised");
});

module.exports = router;
