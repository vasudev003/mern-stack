import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connect from "./database/mongoDb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();
const Port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

await connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", routes);

app.listen(Port, () => {
  console.log("Server is running at http://localhost:4000");
});
