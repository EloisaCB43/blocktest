const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { MONGO_URI, API_PORT, ACCESS_TOKEN_SECRET } = process.env;
// db connection
try {
  mongoose
    .connect(
      MONGO_URI,
      // security connections
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((response) => {
      console.log("dbconnection info");
      console.log(response);
    });
} catch (error) {
  console.log(error);
}

// App instance
const app = express();

// important built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.listen(API_PORT, () => console.log("Server running in port 3000"));

const usersRoutes = require("./src/routes/usersRoutes");
const moviesRoutes = require("./src/routes/moviesRoutes");

app.use("/user", usersRoutes);
app.use("/movie", moviesRoutes);
