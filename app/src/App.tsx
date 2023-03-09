import { useEffect, useState } from "react";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import "dotenv/config"
import { z } from "zod"
import { UserData, UserDataType} from "../utils/types"

const UserLoginInfo = z.object({
  username: z.string(),
  password: z.string()
})

type UserLoginInfo = z.infer<typeof UserLoginInfo>

function App() {
  const [user, setUser] = useState<UserDataType | null>(null)//{user_id: 1, username: "asdas"}

  useEffect(() => {
    const userLoginInfo = localStorage.getItem("loginInfo")

    if (userLoginInfo && !user) {
      const parsedLoginInfo = 
        UserLoginInfo.safeParse(JSON.parse(userLoginInfo))
      
      if (!parsedLoginInfo.success) return 

      getUser(parsedLoginInfo.data)
    }

    localStorage.setItem("loginInfo", "")
  })

  async function getUser(userLoginInfo: UserLoginInfo) {
    const loginEndpoint = `${process.env.API_URL}/login`

    const response = await fetch(loginEndpoint, {
      method: "POST",
      body: JSON.stringify(userLoginInfo),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })

    if (!response.ok) {
      return
    }
    const data = await response.json()
    console.log(data)
    const parsedUserData = UserData.safeParse(data)
    if (parsedUserData.success) {
      console.log("auisdhuiasidhiashd", parsedUserData.data)
      setUser(parsedUserData.data)
    }
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  if (user) {
    return (
      <LandingPage user={user}/>
    )
  }

  return (
    <LoginPage />
  );
}

export default App;
