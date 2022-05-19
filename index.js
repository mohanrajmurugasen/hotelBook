const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./Routes/users");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://hotel:hotel_84@hotel.qi7ug.mongodb.net/hotel?retryWrites=true&w=majority"
);

app.use("/", users);

app.listen(port, () => {
  console.log("Server started successfully");
});
