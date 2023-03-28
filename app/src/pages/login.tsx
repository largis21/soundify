import { useState } from "react";
import { UserLoginInfoType } from "../../utils/types";

export default function LoginPage({
  sendLoginRequest,
  errorText
}: {
  sendLoginRequest: (
    {}: UserLoginInfoType, 
    sendLoginRequest: boolean
  ) => any,
  errorText: string
}) {
  const [usernameInput, setUsernameInput] = useState("root")
  const [passwordInput, setPasswordInput] = useState("root")

  function handleSignInClicked() {
    sendLoginRequest({ 
      username: usernameInput,
      password: passwordInput
    }, false)
  }

  return (
    <div className="bg-neutral-800 flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col items-center w-fit">
        <h1 className="text-5xl text-white">Please sign in</h1>
        <input 
          type="text"
          className="mt-5 p-1 w-72"
          placeholder="username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input 
          type="password"
          className="mt-5 p-1 w-72"
          placeholder="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <p className="text-red-500 mt-1">{errorText}</p>
        <button 
          className="mt-7 bg-green-600 text-white px-7 py-3 rounded-full"
          onClick={handleSignInClicked}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

