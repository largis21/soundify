import { PlayingOptions } from "../pages/mainPage"
import { PlaylistDataType, SongDataType } from "../../utils/types"
import { SyntheticEvent } from "react"

export default function PlaylistPage({ 
  playlist,
  playingOptions,
  setPlayingOptions
}: { 
  playlist: PlaylistDataType,
  playingOptions: PlayingOptions,
  setPlayingOptions: (newPOpt: PlayingOptions) => any
}) {
  function playSongFromPlaylist(songIndex: number) {
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.queue = playlist.songs.slice(songIndex)
    playingOptionsClone.currentTime = 0
    playingOptionsClone.isPlaying = true
    setPlayingOptions(playingOptionsClone)
  }

  return (
    <div className="bg-neutral-900 flex flex-col flex-grow h-fill overflow-y-scroll">
      <header className="bg-neutral-800 py-10">
        <h2 className="text-white text-5xl font-bold ml-5">
          {playlist.playlist_name}
        </h2>
      </header>
      <div className="flex flex-col">
        <button
          className="rounded-full aspect-square m-5 
            bg-soundifyGreen w-10 flex justify-center items-center focus:outline-none"
          onClick={() => playSongFromPlaylist(0)}
        >
          <img src={"/icons/play.svg"} alt="Play playlist" />
        </button>
        <ul className="mx-3 pt-2 border-t-neutral-600 border-t-[1px]">
          {
            playlist.songs.map((song: SongDataType, index: number) => (
              <li key={song.song_id}>
                <PlaylistSong
                  songIndex={index}
                  song={song}
                  playSong={() => playSongFromPlaylist(index)}
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
  song,
  playSong
}: {
  songIndex: number,
  song: SongDataType,
  playSong: (idx: number) => any
}) {
  return (
    <div 
      className="mx-1 p-3 h-14 flex items-center rounded gap-5 group hover:bg-neutral-700 cursor-pointer"
      onClick={() => playSong(songIndex)}
    >
      <div className="h-[16px] overflow-hidden">
        <div className="h-[32px] group-hover:-translate-y-[16px]">
          <p className="text-xs text-neutral-500">{songIndex + 1}</p>
          <svg width="16px" height="16px" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5593 6.72332C13.1469 7.06851 13.1469 7.93149 12.5593 8.27669L1.32203 14.8785C0.734463 15.2237 -2.96568e-08 14.7922 0 14.1018L5.67186e-07 0.898177C5.96843e-07 0.20779 0.734464 -0.223702 1.32203 0.121492L12.5593 6.72332Z" fill="#EEEEEE"/>
          </svg>
        </div>
      </div>

      <img 
        src={`http://localhost:8080/song/cover/${song.song_id}`}
        onError={(e: SyntheticEvent<HTMLImageElement>) => e.currentTarget.src = "/icons/cd_placeholder.svg"}
        height={40}
        width={40}
        alt="Playlist cover" 
      />

      <div className="">
        <h4 className="text-white">{song.song_name}</h4>
        <h5 className="text-sm text-neutral-500">{song.artist.artist_name}</h5>
      </div>
    </div>
  )
}
