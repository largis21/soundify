import express, { Request, Response } from "express";
import prismaclient from "../lib/prismaclient";
import { getAuth } from "../auth";
import { z } from "zod";
import { readFileSync } from "fs";
import path from "path"

const router = express.Router();

const reqId = z.coerce.number()

router.get("/:id", async (
  req: Request, 
  res: Response
) => {
  const params = req.params
  const id = params["id"]
  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return
  }

  const parsedId = reqId.safeParse(id)

  if (!parsedId.success) {
    res.status(400).json({ error: "Bad request" });
    return
  }

  const auth = getAuth(req)
  if (!auth.user_id) {
    res.status(401).json({ error: "Unauthenticated" })
    return
  }

  const song = await prismaclient.song.findUnique({
    where: {
      song_id: parsedId.data
    }
  })

  if (!song) {
    res.status(404).json({ error: "Could not find song" })
    return
  }

  res.status(200).sendFile(path.resolve(__dirname, `../../songs/songs/${song.song_id}.mp3`))
});

router.get("/cover/:id", async (
  req: Request, 
  res: Response
) => {
  const params = req.params
  const id = params["id"]
  if (!id) {
    res.status(400).json({ error: "Bad request" });
    return
  }

  const parsedId = reqId.safeParse(id)

  if (!parsedId.success) {
    res.status(400).json({ error: "Bad request" });
    return
  }

  const auth = getAuth(req)
  if (!auth.user_id) {
    res.status(401).json({ error: "Unauthenticated" })
    return
  }

  const song = await prismaclient.song.findUnique({
    where: {
      song_id: parsedId.data
    }
  })

  if (!song) {
    res.status(404).json({ error: "Could not find song" })
    return
  }

  let coverFile;
  try {
    coverFile = readFileSync(path.resolve(__dirname, `../../songs/cover/${song.song_id}.jpg`));
  } catch {
    res.status(404).json({ error: "Could not find song" })
    return
  }

  res.status(200).send(coverFile)
});

export default router;

