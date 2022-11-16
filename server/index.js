const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
require("dotenv").config();

//app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.auw3fso.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Database connection established"))
  .catch((e) => console.error(e));

app.use(morgan("dev"));
app.use(express.json()); // body-parser asemel
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

//app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header("Access-Control-Allow-Origin: *");
    res.header(
      "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token"
    );

    return res.status(200).json({});
  }
  next();
});

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

app.get("*", (req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
