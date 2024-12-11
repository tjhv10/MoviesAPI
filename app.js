const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./");

const app = express();

app.use(bodyParser.json()); // application/json

app.use("/feed", feedRoutes);

app.listen(8080);

exports = router;
