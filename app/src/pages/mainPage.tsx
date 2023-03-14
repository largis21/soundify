import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType, QueueType, PlayingOptionsType, SongDataType } from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "@/components/Playlist";
import { API_URL } from "../../ENV";

const defaultPlayingOpt: PlayingOptionsType = {
  isPlaying: false,
  currentTime: 0,
  audioRef: null,
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
  const [prevSong, setPrevSong] = useState<SongDataType["song_id"] | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    
    if (
      playingOptions.isPlaying && 
      playingOptions.queue.songs.length !== 0
    ) {
      const newSong = playingOptions.queue.songs[playingOptions.queue.currentSongIndex]
      const isSameSongAsLast = 
        newSong.song_id === prevSong
      if (!isSameSongAsLast) {
        audioRef.current.src = 
          `${API_URL}/song/${newSong.song_id}`
        setPrevSong(newSong.song_id)
      }
      audioRef.current.currentTime = playingOptions.currentTime
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [playingOptions])

  useEffect(() => {
    if (!audioRef.current) return
    const playingOptionsCopy = {...playingOptions}
    playingOptionsCopy.audioRef = audioRef
    setPlayingOptions(playingOptionsCopy)
  }, [audioRef.current])

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
        <Controlbar
          playingOptions={playingOptions}
          setPlayingOptions={setPlayingOptions}
        />
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
