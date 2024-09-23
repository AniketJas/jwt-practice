const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = 4000;
const time = 1 * 24 * 60 * 60 * 1000;
const jwtSecret = "abcxyz";

app.get("/test", (req, res) => {
  console.log("TEST OK");
  res.json("test ok");
});

app.post("/input", (req, res, next) => {
  const { number } = req.body;
  console.log("Inside Input API :" + number);

  if (number) {
    jwt.sign(
      { number: number },
      jwtSecret,
      { expiresIn: time },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(number);
        console.log("JWT token created");
      }
    );
  }
});

app.get("/output", (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
      if (err) throw err;
      console.log(data.number);
      res.json(data);
    });
  }
});

app.post("/reset", (req, res) => {
  console.log("Reset Successfully");
  res.cookie("token", "").json(true);
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
