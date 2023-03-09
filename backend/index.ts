import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import "dotenv/config.js"
import cors from "cors"

import userRoute from "./routes/user";
import loginRoute from "./routes/login";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/login", loginRoute);
app.use("/user", userRoute);

app.listen(8080);
