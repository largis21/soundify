import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { Routes, UserDataType} from "../../utils/types";
import { useEffect, useState } from "react";

export class Router {
  currentRoute: Routes

  constructor() {
    this.currentRoute = "home"
  }

  setCurrentRoute(route: Routes) {
    this.currentRoute = route 
  }

  getCurrentRoute() {
    return this.currentRoute
  }
}

export default function LandingPage({ user }: { user: UserDataType }) {
  const [mainRouter, setRouter] = useState(new Router())

    setInterval(() => {
      console.log(mainRouter)
    }, 1000) 

  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <div className="flex flex-row flex-1">
        <Sidebar router={mainRouter}/>
        <RouteSwitcher router={mainRouter} user={user} />
      </div>
      <Controlbar />
    </div>
  );
}

function RouteSwitcher({
  router,
  user
}: {
  router: Router,
  user: UserDataType
}) {
  switch (router.getCurrentRoute()) {
    case "home":
      return <Landing user={user}/>
  }

  return <></>
}
