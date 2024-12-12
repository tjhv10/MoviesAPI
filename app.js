const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

app.use("/feed", feedRoutes);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
