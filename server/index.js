const corsMiddleware = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const getAllUsers = require("./users/controllers/getAllUsers");
const getUserStatsById = require("./users/controllers/getUserStatsById");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware());
app.use(express.json());

app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserStatsById);
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ message: `Express server is running!` }));
});

app.listen(PORT, () =>
  console.log("Express server is running on localhost:3001")
);
