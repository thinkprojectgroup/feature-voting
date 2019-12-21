const express = require("express");
const { User } = require("../models/user");
const { validateToken } = require("../models/auth");
const router = express.Router();

router.post("/admin", async (req, res) => {
  const tokenId = await req.body.idToken;
  if (!tokenId) return res.status(302).send("Login required."); // HTTP Status 302 - Redirect to Loginpage

  const loginTicket = await validateToken(res, tokenId);

  if (loginTicket) {
    let user = await User.findOne({ email: loginTicket.payload.email });

    if (user.role === "admin")
      return res.status(200).send("authorized as admin");
  }
  res.status(401).send("Unauthorized. You need admin rights to access this page");
});

router.post("/", async (req, res) => {
  const tokenId = await req.body.idToken;

  if (!tokenId) res.status(302).send("Login required."); // HTTP Status 302 - Redirect to Loginpage

  const loginTicket = await validateToken(res, tokenId);

  if(loginTicket) {
    const payload = loginTicket.payload;
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        role: "admin",
        email: payload.email,
        name: payload.email
      });
      await user.save();
    }
    console.log(user); //TODO delete log (dev only)

    //TODO remove sending user.role (dev only)
    return res.status(200).send({
      role: user.role
    });
  }
  res.status(401).send("Unauthorized");
});

module.exports = router;
