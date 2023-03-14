import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType, QueueType, PlayingOptionsType } from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "@/components/Playlist";
import { API_URL } from "../../ENV";

const defaultPlayingOpt: PlayingOptionsType = {
  isPlaying: false,
  currentTime: 0,
  queue: {
    currentSongIndex: 0,
    playingFromPlaylist: 0,
    songs: []
  }
}

export default function MainPage({ user }: { user: UserDataType }) {
  const [route, setRoute] = useState<Routes>("home")
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistDataType | null>(null)
  const [playingOptions, setPlayingOptions] = 
    useState<PlayingOptionsType>(defaultPlayingOpt)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    console.log(playingOptions)
    if (!audioRef.current) return
    if (!playingOptions) return

    if (playingOptions.isPlaying) {
      audioRef.current.src = 
        `${API_URL}/song/${playingOptions.queue.songs[playingOptions.queue.currentSongIndex].song_id}`
      audioRef.current.currentTime = audioRef.current.duration * (playingOptions.currentTime / 100)
      audioRef.current.play()
    }
  }, [playingOptions])

  return (
    <>
      <audio 
        src=""
        ref={audioRef}
      />
      <div className="flex flex-col min-h-screen max-h-screen">
        <div className="flex flex-row flex-1">
          <Sidebar 
            route={route} 
            setRoute={(newRoute: Routes) => setRoute(newRoute)}
            playlists={user.playlists}
            setCurrentPlaylist={(playlist: PlaylistDataType) => setCurrentPlaylist(playlist)}
          />
          <RouteSwitcher 
            route={route} 
            user={user} 
            currentPlaylist={currentPlaylist}
            playingOptions={playingOptions}
            setPlayingOptions={setPlayingOptions}
          />
        </div>
        <Controlbar />
      </div>
    </>
  );
}

function RouteSwitcher({
  route,
  user,
  currentPlaylist,
  playingOptions,
  setPlayingOptions
}: {
  route: Routes,
  user: UserDataType,
  currentPlaylist: PlaylistDataType | null,
  playingOptions: PlayingOptionsType
  setPlayingOptions: (newPOpt: PlayingOptionsType) => any
}) {
  switch (route) {
    case "home":
      return (
        <Landing user={user}/>
      )
    case "playlist":
      if (currentPlaylist) {
        return (
          <PlaylistPage 
            playlist={currentPlaylist}
            playingOptions={playingOptions}
            setPlayingOptions={setPlayingOptions}
          />
        )
      } else {
        return <></>
      }
  }

  return <></>
}
