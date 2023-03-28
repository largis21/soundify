import { PlaylistDataType, Routes, UserDataType } from "../../utils/types"
import { PlayingOptions } from "../pages/mainPage"

export default function Landing({ 
  user,
  setCurrentPlaylist,
  setRoute,
  playingOptions,
  setPlayingOptions
}: { 
  user: UserDataType 
  setCurrentPlaylist: (newPlaylist: PlaylistDataType) => any
  setRoute: (newRoute: Routes) => any
  playingOptions: PlayingOptions,
  setPlayingOptions: (newPOpt: PlayingOptions) => any
}) {
  function playPlaylist(playlist: PlaylistDataType) {
    const playingOptionsClone = playingOptions.clone()

    playingOptionsClone.queueIndex = 0
    playingOptionsClone.queue = playlist.songs
    playingOptionsClone.play()
    playingOptionsClone.restartSong()

    if (playingOptionsClone.shuffle) {
      playingOptionsClone.shuffleQueue()
    }
    
    setPlayingOptions(playingOptionsClone)
  }

  return (
    <div className="flex-[3] bg-neutral-900 overflow-x-hidden">
      <h2 className="text-white text-4xl font-bold my-10 ml-5">
        {`God ettermiddag ${user.username}`}
      </h2>
      <div className="flex flex-wrap [&>*]:ml-5 [&>*]:mt-5 overflow-auto">
        {
          user.playlists.map((playlist) => (
            <Card 
              key={playlist.playlist_id}
              imageURL={`${import.meta.env.VITE_API_URL}/song/cover/${playlist.songs[0].song_id}`}
              title={playlist.playlist_name}
              type={"Playlist"}
              onClick={() => {
                setCurrentPlaylist(playlist)
                setRoute("playlist")
              }}
              playOnClick={() => playPlaylist(playlist)}
            />
          ))
        }
      </div>
    </div>
  );
}

type CardProps = {
  imageURL?: string;
  title: string;
  type: "Album" | "Playlist" | "Artist" | "Song";
  artists?: string[];
  onClick?: () => any;
  playOnClick?: () => any
};

function Card({ imageURL, title, type, artists, onClick, playOnClick }: CardProps) {
  return (
    <div className="w-52 h-72 rounded-xl bg-neutral-800 p-4 group hover:bg-neutral-700 transition-colors" >
      <div className="relative" onClick={onClick}>
      
        <img
          src={imageURL ? imageURL : "/icons/cd_placeholder.svg"}
          alt="Cover"
          className="rounded-lg w-full aspect-square"
        />
        <button
          className="rounded-full aspect-square absolute right-3 bottom-0 opacity-0
            bg-soundifyGreen w-10 p-2 flex justify-center items-center focus:outline-none
            group-hover:bottom-3 group-hover:opacity-100 transition-all duration-300"
          onClick={playOnClick}
        >
          <img src={"/icons/play.svg"} alt="Play" />
        </button>
      </div>
      <h3 className="text-white text-xl font-semibold mt-3 ">{title}</h3>
      <p className="text-neutral-400 mt-1 ">
        <span>{type}</span>
        {
          artists && <>
            <span> • </span>
            <span>{artists.join(", ")}</span>
          </>
        }
      </p>
    </div>
  );
}
