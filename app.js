const express = require("express");
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");

const app = express();

app.use((req, _, next) => {
  console.log("Request Details:");
  console.log("  Endpoint:", req.url);
  console.log("  HTTP Method:", req.method);
  console.log("  User Agent:", req.headers["user-agent"]);
  next();
});

app.use(bodyParser.json());

app.use("/feed", feedRoutes);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
