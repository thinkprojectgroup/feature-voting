const express = require("express");
const { User } = require("../models/user");
const { validateToken } = require("../services/AuthService");
const router = express.Router();

router.post("/", async (req, res) => {
  const idToken = req.body.idToken;
  if (!idToken) return res.status(302).send("Login required."); // HTTP Status 302 - Redirect to Loginpage

  const loginTicket = await validateToken(idToken);
  if (loginTicket) {
    const payload = loginTicket.payload;
    const deviceHash = req.get('Hash') || ""

    let user = await User.findOne({ email: payload.email });
    const cookieOptions = {
      httpOnly: true,
      expires: new Date('Tue Jul 01 2050 06:01:11 GMT-0400 (EDT)'),
      overwrite: true
    }

    //TODO Edit Response Message, so role is not visible (just for testing)
    if (user) {
      res.cookie('userId', user._id, cookieOptions); // Set the correct userId
      if (user.deviceHash !== deviceHash) { // If user has logged in with different deviceHash, update it.
        user.deviceHash = deviceHash
        await user.save()
      }
      if (user.role == 'admin') {
        return res.status(200).send("authorised as admin");
      } else if (user.role == 'employee') {
        return res.status(211).send('authorised as employee');
      } else {
        return res.status(212).send('authorised as user')
      }
    } else { // User not found via email, update current one or create new
      user = await User.findById(req.userId)
      if (user) {
        user.role = "admin"
        user.email = payload.email
        user.name = payload.email
        user.deviceHash = deviceHash
        await user.save()
      } else {
        user = new User({
          role: "admin",
          email: payload.email,
          name: payload.email,
          deviceHash: deviceHash
        });
        res.cookie('userId', user._id, cookieOptions); // Set the correct userId
        await user.save();
      }
      return res.status(200).send('authorised as admin')
    }
  }
  res.status(401).send("Unauthorised.");
});

/*
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
});*/

module.exports = router;
