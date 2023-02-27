import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import "dotenv/config.js"

import userRoute from "./routes/user";
import loginRoute from "./routes/login";

const app = express();

app.use(bodyParser.json())
app.use(cookieParser())

app.use("/login", loginRoute);
app.use("/user", userRoute);

app.listen(8080);
