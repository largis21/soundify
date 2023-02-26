import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import userRoute from "./routes/user";

const app = express();

app.use(bodyParser.json())

// app.use("/login", login);

app.use("/user", userRoute);

app.listen(8080);
