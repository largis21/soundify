import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType, SongDataType } from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "../components/Playlist";
import { UnfishedPage } from "../components/UnfinishedPage";

export class PlayingOptions {
  isPlaying: boolean
  currentTime: number
  shuffle: boolean
  repeat: boolean
  audioRef: HTMLAudioElement | null
  queue: SongDataType[]
  unShuffledQueue: SongDataType[]
  prevSong: SongDataType["song_id"] | null

  constructor() {
    this.isPlaying = false
    this.currentTime = 0
    this.shuffle = false
    this.repeat = false
    this.audioRef = null
    this.queue = []
    this.unShuffledQueue = []
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

    this.queue = this.queue.slice(1)
    this.currentTime = 0
  }

  skipBackSong() {
    this.currentTime = 0
  }

  shuffleQueue() {
    if (this.queue.length === 0) return
    if (!this.audioRef) return

    if (this.unShuffledQueue.length !== 0) {
      this.queue = this.unShuffledQueue
    }

    this.unShuffledQueue = this.queue

    this.queue = [this.queue[0], ...this.queue.slice(1).sort(() => Math.random() - 0.5)];
    this.currentTime = this.audioRef.currentTime
    this.shuffle = true
  }

  unShuffleQueue() {
    if (this.unShuffledQueue.length === 0) return
    if (!this.audioRef) return

    this.currentTime = this.audioRef.currentTime
    this.queue = [this.queue[0], ...this.unShuffledQueue.slice(1)]
    this.shuffle = false
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

  function handleSongEnded() {
    const playingOptionsClone = playingOptions.clone()
    playingOptionsClone.skipSong()
    setPlayingOptions(playingOptionsClone)
  }

  useEffect(() => {
    if (!playingOptions.audioRef) return
    
    if (
      playingOptions.isPlaying && 
      playingOptions.queue.length !== 0
    ) {
      const newSong = playingOptions.queue[0]
      const isSameSongAsLast = newSong.song_id === playingOptions.prevSong

      if (!isSameSongAsLast) {
        playingOptions.audioRef.src = `${import.meta.env.VITE_API_URL}/song/${newSong.song_id}`
        playingOptions.prevSong = newSong.song_id
      }

      playingOptions.audioRef.currentTime = playingOptions.currentTime
      playingOptions.audioRef.play()

      navigator.mediaSession.metadata = new MediaMetadata({
        title: playingOptions.queue[0].song_name
      })
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
        onEnded={handleSongEnded}
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
    default:
      return <UnfishedPage />
  }
}
