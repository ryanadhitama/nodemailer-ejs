const express = require("express");
const { sendEmail } = require("./email");

const app = express();

app.get("/v1/send-email", (req, res) => {
  try {
    sendEmail(
      "test@mailinator.com",
      "Welcome message",
      "Welcome message content"
    );
    res.send("send email success");
  } catch (error) {
    res.send(error?.message);
    next();
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
