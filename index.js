const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tracking Redirect API Running");
});

app.get("/track/:code", (req, res) => {
  const code = req.params.code.toUpperCase();

  let redirectUrl = "";

  if (code.startsWith("1Z")) {
    redirectUrl = `https://www.ups.com/track?tracknum=${code}`;
  } 
  else if (/^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code)) {
    redirectUrl = `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${code}`;
  } 
  else {
    redirectUrl = `https://www.17track.net/en/track#nums=${code}`;
  }

  res.redirect(redirectUrl);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
