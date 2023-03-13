import { useEffect, useState } from "react";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/login";
import { UserData, UserDataType, UserLoginInfoType} from "../utils/types"
import { API_URL } from "../ENV"

export default function App() {
  const [user, setUser] = useState<UserDataType | null>(null)
  const [loginError, setLoginError] = useState("")

  async function sendLoginRequest(
    loginInfo: UserLoginInfoType, 
    ignoreResult: boolean
  ) {
    const loginEndpoint = `${API_URL}/login`

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

    console.log(data)

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
      <MainPage user={user}/>
    )
  }

  return (
    <LoginPage sendLoginRequest={sendLoginRequest} errorText={loginError} />
  );
}
