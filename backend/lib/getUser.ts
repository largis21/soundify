import prismaclient from "../lib/prismaclient";
import { z } from "zod";

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

export const UserData = z.object({
  user_id: z.number(),
  username: z.string(),
  password: z.string().optional(),
  playlists: PlaylistData.array()
})

export async function getUser({ 
  username,
  userId
}: {
  username?: string,
  userId?: number 
}): Promise<z.infer<typeof UserData> | void> {
  let searchParam
  
  if (userId) {
    searchParam = { user_id: userId }
  } else if (username) {
    searchParam = { username: username }
  } else {
    return 
  }

  const user = await prismaclient.user.findUnique({
    where: searchParam,
    include: {
      playlist: {
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
      },
    }
  })

  if (!user) {
    return
  }
  
  return ({
    user_id: user.user_id,
    username: user.username,
    password: user.password,
    playlists: user.playlist.map((playlist) => ({
      playlist_id: playlist.playlist_id,
      playlist_name: playlist.playlist_name,
      songs: playlist.playlist_song.map((song) => ({
        song_id: song.song_id,
        song_name: song.song.song_name,
        artist: {
          artist_id: song.song.artist.artist_id,
          artist_name: song.song.artist.artist_name
        }
      }))
    }))
  })
};
/*
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
    }))*/
