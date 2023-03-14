import { z } from "zod"

export const SongData = z.object({
  song_id: z.number(),
  song_name: z.string(),
  artist: z.object({
    artist_id: z.number(),
    artist_name: z.string()
  })
})

export type SongDataType = z.infer<typeof SongData>

export const PlaylistData = z.object({
  playlist_id: z.number(),
  playlist_name: z.string(),
  songs: SongData.array()
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

export const Queue = z.object({
  playingFromPlaylist: z.number(),
  currentSongIndex: z.number(),
  songs: SongData.array()
})

export type QueueType = z.infer<typeof Queue>

export const PlayingOptions = z.object({
  isPlaying: z.boolean(),
  currentTime: z.number(), 
  queue: Queue
})

export type PlayingOptionsType = z.infer<typeof PlayingOptions>

