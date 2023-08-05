const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const taskRoute = require("./routes/taskRoute");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
dbConnect();

app.use("/api", taskRoute);

app.listen(PORT, () => {
  console.log(`server is running in port : ${PORT}`);
});
