import express, { Request, Response } from "express";
import prismaclient from "../lib/prismaclient";
import { getAuth } from "../auth";
import { z } from "zod";

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

  const playlist = await prismaclient.playlist.findUnique({
    where: {
      playlist_id: parsedId.data,
    },
    include: {
      playlist_song: {
        include: {
          song: {
            include: {
              artist: true
            }
          }
        }
      }
    }
  })

  if (!playlist) {
    res.status(404).json({ error: "Could not find playlist" })
    return
  }

  if (playlist.owner_id !== auth.user_id) {
    res.status(401).json({ error: "You do not have access to this playlist" })
    return
  }

  res.status(200).json({
    playlist_id: playlist.playlist_id,
    playlist_name: playlist.playlist_name,
    owner_id: playlist.owner_id,
    songs: playlist.playlist_song.map((song) => ({
      song_id: song.song_id,
      song_name: song.song.song_name,
      artist: {
        artist_id: song.song.artist.artist_id,
        artist_name: song.song.artist.artist_name
      }
    }))
  })
});

export default router;

