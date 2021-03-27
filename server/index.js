require("dotenv").config();
// init setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
// setting production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
// routes
require("./routes/User.routes.js")(app);
require("./routes/Library.routes.js")(app);
// connect to data base

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connect database"));

// connect to the port
const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log("app is running at " + port);
});
