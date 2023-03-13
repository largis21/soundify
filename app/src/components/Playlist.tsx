import { z } from "zod"

export const Playlist = z.object({
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

export type PlaylistType = z.infer<typeof Playlist>

export default function PlaylistPage({ 
  playlist 
}: { 
  playlist: PlaylistType 
}) {
  return (
    <div className="bg-neutral-900 flex-grow overflow-x-hidden">
    <header className="bg-neutral-800 py-10">
      <h2 className="text-white text-5xl font-bold ml-5">
        {`Min spilleliste #1`}
      </h2>
    </header>
      <div className="flex flex-col overflow-auto">
        <button
          className="rounded-full aspect-square m-5 
            bg-soundifyGreen w-10 flex justify-center items-center focus:outline-none"
        >
          <img src={"../public/icons/play.svg"} alt="Play playlist" />
        </button>
        <ul className="mx-3 pt-2 border-t-neutral-600 border-t-[1px]">
        {
          playlist.songs.map((song, index) => (
            <li>
              <PlaylistSong
                songIndex={index + 1}
                songName={song.song_name}
                artistName={song.artist.artist_name}
              />
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

function PlaylistSong({
  songIndex,
  imgPath,
  songName,
  artistName,
}: {
  songIndex: number,
  imgPath?: string,
  songName: string,
  artistName: string
}) {
  return (
    <div className="mx-5 h-14 flex items-center gap-5 ">
      <p className="text-sm text-neutral-500">{songIndex}</p>
      <img 
        src={imgPath || "../public/icons/cd_placeholder.svg"}
        height={40}
        width={40}
        alt="Playlist cover" 
      />
      <div className="">
        <h4 className="text-white">{songName}</h4>
        <h5 className="text-sm text-neutral-500">{artistName}</h5>
      </div>
    </div>
  )
}
