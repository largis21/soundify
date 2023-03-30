import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType, SongDataType } from "../../utils/types";
import { useEffect, useRef, useState } from "react";
import PlaylistPage from "../components/Playlist";
import { UnfishedPage } from "../components/UnfinishedPage";

export class PlayingOptions {
  isPlaying: boolean
  shuffle: boolean
  repeat: boolean
  audio: HTMLAudioElement
  queue: SongDataType[]
  queueIndex: number
  unShuffledQueue: SongDataType[]
  prevSong: SongDataType["song_id"] | null

  constructor() {
    this.isPlaying = false
    this.shuffle = false
    this.repeat = false
    this.audio = new Audio()
    this.queue = []
    this.queueIndex = 0
    this.unShuffledQueue = []
    this.prevSong = null
  }

  play() {
    if (this.queue.length === 0) {
      this.audio.pause()
      return
    }

    const newSong = this.queue[this.queueIndex]
    const isSameSongAsLast = newSong.song_id === this.prevSong

    if (!isSameSongAsLast) {
      this.audio.src = `${import.meta.env.VITE_API_URL}/song/${newSong.song_id}`
      this.prevSong = newSong.song_id
      this.audio.currentTime = 0
    }

    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  addToQueue(song: SongDataType) {
    this.queue.push(song)
  }

  skipSong() {
    if (this.queue.length === 0) return

    if (this.queue.length - 1 < this.queueIndex + 1) {
      this.queue = []
      this.audio.currentTime = 0
      this.audio.pause()
      return
    }

    this.queueIndex++
    this.play()
  }

  restartSong() {
    if (this.audio.currentTime < 1) {
      if (this.queueIndex < 1) return
      this.queueIndex--
      this.play()
    }

    this.audio.currentTime = 0
  }

  shuffleQueue() {
    if (this.queue.length === 0) return

    if (this.unShuffledQueue.length !== 0) {
      this.queue = this.unShuffledQueue
    }

    console.log("Start", this.queue.map((song) => song.song_id))

    this.unShuffledQueue = this.queue // Slik vi kan sette tilbake køen til sin opprinnelige form senere 

    const currentSong = this.queue[this.queueIndex] // Husk til senere
    this.queue.splice(this.queueIndex, 1) // Fjern den fra køen
    this.queue.sort(() => Math.random() - 0.5) // Ikke ekte shuffling, men bra nok
    this.queue.splice(this.queueIndex, 0, currentSong) // Legg inn igjen sangen

    console.log("shuffled", this.queue.map((song) => song.song_id))
    console.log("this unshuffledqueue", this.unShuffledQueue.map((song) => song.song_id))
    this.shuffle = true
  }

  unShuffleQueue() {
    this.shuffle = false

    if (
      this.unShuffledQueue.length === 0 ||
      this.queue.length === 0
    ) return

    this.queue = this.unShuffledQueue
  }

  clone(): this {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}

export default function MainPage({ user }: { user: UserDataType }) {
  const [route, setRoute] = useState<Routes>("home")
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistDataType | null>(null)
  const [playingOptions, setPlayingOptions] = useState(new PlayingOptions())

  useEffect(() => {
    playingOptions.audio.onended = () => {
      const playingOptionsClone = playingOptions.clone()
      if (playingOptionsClone.repeat) {
        playingOptionsClone.restartSong()
        playingOptionsClone.play()
      } else {
        playingOptionsClone.skipSong()
      }
      setPlayingOptions(playingOptionsClone)
    }
  }, [playingOptions])

  return (
    <>
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
            setCurrentPlaylist={setCurrentPlaylist}
            setRoute={setRoute}
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
  setPlayingOptions,
  setCurrentPlaylist,
  setRoute
}: {
  route: Routes,
  user: UserDataType,
  currentPlaylist: PlaylistDataType | null,
  playingOptions: PlayingOptions
  setPlayingOptions: (newPOpt: PlayingOptions) => any
  setCurrentPlaylist: (newPlaylist: PlaylistDataType) => any
  setRoute: (newRoute: Routes) => any
}) {
  switch (route) {
    case "home":
      return (
          <Landing 
            user={user}
            setCurrentPlaylist={setCurrentPlaylist}
            setRoute={setRoute}
            playingOptions={playingOptions}
            setPlayingOptions={setPlayingOptions}
          />
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
