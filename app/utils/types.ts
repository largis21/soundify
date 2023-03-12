import { z } from "zod"

export const UserData = z.object({
  user_id: z.number(),
  username: z.string()
})

export type UserDataType = z.infer<typeof UserData>

export const UserLoginInfo = z.object({
  username: z.string(),
  password: z.string()
})

export type UserLoginInfoType = z.infer<typeof UserLoginInfo>

export type Routes = "home" | "search" | "library" | "playlist"
