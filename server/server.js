import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const Port = 4000;
const app = express();

app.use(cors);

await mongoose.connect(
  "mongodb+srv://vasudev:vasu2000@vasudev-mern.8znkqln.mongodb.net/?retryWrites=true&w=majority"
);
console.log("mongoDb connected");

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(Port, () => {
  console.log("Server is running at http://localhost:4000");
});
