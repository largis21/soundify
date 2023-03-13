import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType} from "../../utils/types";
import { useState } from "react";
import PlaylistPage from "@/components/Playlist";

export default function MainPage({ user }: { user: UserDataType }) {
  const [route, setRoute] = useState<Routes>("home")

  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <div className="flex flex-row flex-1">
        <Sidebar 
          route={route} 
          setRoute={(newRoute: Routes) => setRoute(newRoute)}
        />
        <RouteSwitcher route={route} user={user} />
      </div>
      <Controlbar />
    </div>
  );
}

function RouteSwitcher({
  route,
  user
}: {
  route: Routes,
  user: UserDataType
}) {
  switch (route) {
    case "home":
      return <Landing user={user}/>
    case "playlist":
      return <PlaylistPage />
  }

  return <></>
}
