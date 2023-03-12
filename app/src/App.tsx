import { useEffect, useState } from "react";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import "dotenv/config"
import { UserData, UserDataType, UserLoginInfoType} from "../utils/types"

export default function App() {
  const [user, setUser] = useState<UserDataType | null>(null)//{user_id: 1, username: "asdas"}
  const [loginError, setLoginError] = useState("")

  async function sendLoginRequest(
    loginInfo: UserLoginInfoType, 
    ignoreResult: boolean
  ) {
    const loginEndpoint = `${process.env.API_URL}/login`

    const response = await fetch(loginEndpoint, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })

    if (!response.ok) {
      if (!ignoreResult) setLoginError((await response.json()).error)
      return
    }

    const data = await response.json()
    const parsedUserData = UserData.safeParse(data)

    if (parsedUserData.success) {
      setUser(parsedUserData.data)
    } else {
      console.log(parsedUserData.error)
      setLoginError("Failed to login")
    }
  }

  useEffect(() => {
    // Sends a login request with cookies
    sendLoginRequest({username: "", password: ""}, true)
  }, [])

  if (user) {
    return (
      <LandingPage user={user}/>
    )
  }

  return (
    <LoginPage sendLoginRequest={sendLoginRequest} errorText={loginError} />
  );
}
