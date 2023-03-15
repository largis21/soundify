import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType, QueueType, PlayingOptionsType, SongDataType } from "../../utils/types";
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import PlaylistPage from "@/components/Playlist";
import { API_URL } from "../../ENV";

export class PlayingOptions {
  isPlaying: boolean
  currentTime: number
  shuffle: boolean
  repeat: boolean
  audioRef: HTMLAudioElement | null
  queue: SongDataType[]
  prevSong: SongDataType["song_id"] | null

  constructor() {
    this.isPlaying = false
    this.currentTime = 0
    this.shuffle = false
    this.repeat = false
    this.audioRef = null
    this.queue = []
    this.prevSong = null
  }

  addToQueue(song: SongDataType) {
    this.queue.push(song)
  }

  skipSong() {
    if (
      this.queue.length === 0 ||
      this.queue.length === 1
    ) {
      this.queue = []
      return
    }

    this.queue.slice(1)
    this.currentTime = 0
  }

  clone(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

export default function MainPage({ user }: { user: UserDataType }) {
  const [route, setRoute] = useState<Routes>("home")
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistDataType | null>(null)
  const [playingOptions, setPlayingOptions] = useState(new PlayingOptions())

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!playingOptions.audioRef) return
    
    if (
      playingOptions.isPlaying && 
      playingOptions.queue.length !== 0
    ) {
      const newSong = playingOptions.queue[0]
      const isSameSongAsLast = newSong.song_id === playingOptions.prevSong

      if (!isSameSongAsLast) {
        playingOptions.audioRef.src = `${API_URL}/song/${newSong.song_id}`
        playingOptions.prevSong = newSong.song_id
      }

      playingOptions.audioRef.currentTime = playingOptions.currentTime
      playingOptions.audioRef.play()
    } else {
      playingOptions.audioRef.pause()
    }
  }, [playingOptions])

  useEffect(() => {
    if (!audioRef.current) return
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.audioRef = audioRef.current
    setPlayingOptions(playingOptionsClone)
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
  playingOptions: PlayingOptions
  setPlayingOptions: (newPOpt: PlayingOptions) => any
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
