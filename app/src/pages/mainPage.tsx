import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType, PlaylistDataType } from "../../utils/types";
import { useState } from "react";
import PlaylistPage from "@/components/Playlist";

export default function MainPage({ user }: { user: UserDataType }) {
  const [route, setRoute] = useState<Routes>("home")
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistDataType | null>(null)

  return (
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
        />
      </div>
      <Controlbar />
    </div>
  );
}

function RouteSwitcher({
  route,
  user,
  currentPlaylist
}: {
  route: Routes,
  user: UserDataType,
  currentPlaylist: PlaylistDataType | null
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
          />
        )
      } else {
        return <></>
      }
  }

  return <></>
}
