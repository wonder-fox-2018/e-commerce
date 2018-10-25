const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.URL_MONGO_LOCAL,
  { useNewUrlParser: true }
);

// mongoose.connect(
//   process.env.URL_MONGO_MLAB,
//   { useNewUrlParser: true }
// );

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("mongo connected");
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("Listening on port ", port);
});
