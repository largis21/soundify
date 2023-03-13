import { z } from "zod"

export const PlaylistData = z.object({
  playlist_id: z.number(),
  playlist_name: z.string(),
  songs: z.object({
    song_id: z.number(),
    song_name: z.string(),
    artist: z.object({
      artist_id: z.number(),
      artist_name: z.string()
    })
  }).array()
})

export type PlaylistDataType = z.infer<typeof PlaylistData>

export const UserData = z.object({
  user_id: z.number(),
  username: z.string(),
  password: z.string().optional(),
  playlists: PlaylistData.array()
})

export type UserDataType = z.infer<typeof UserData>

export const UserLoginInfo = z.object({
  username: z.string(),
  password: z.string()
})

export type UserLoginInfoType = z.infer<typeof UserLoginInfo>

export type Routes = "home" | "search" | "library" | "playlist"
