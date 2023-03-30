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

const FRONTEND_URL = process.env.FRONTEND_URL

if (!FRONTEND_URL) {
  throw new Error("No frontend url");
} else {
  console.log(`Frontend url: ${FRONTEND_URL}`)
}

app.use(cors({
  origin: "https://lars-soundify.netlify.app",
  credentials: true,
}))

app.use(bodyParser.json())
app.use(cookieParser())

app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/playlist", playlistRoute);
app.use("/song", songRoute);

app.listen(8080);
