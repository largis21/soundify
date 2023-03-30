import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import "dotenv/config.js"
import cors from "cors"

import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import playlistRoute from "./routes/playlist"
import songRoute from "./routes/song"

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://localhost:5173',
    'http://localhost:80',
    'https://localhost:80',
    'http://localhost:443',
    'https://localhost:443',
    'http://localhost:5500',
    'https://localhost:5500',
    process.env.FRONTEND_URL || ""
  ],
  credentials: true
}))

app.use(bodyParser.json())
app.use(cookieParser())

app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/playlist", playlistRoute);
app.use("/song", songRoute);

app.listen(8080);
