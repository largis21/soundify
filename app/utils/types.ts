import { z } from "zod"

export const UserData = z.object({
  user_id: z.number(),
  username: z.string()
})

export type UserDataType = z.infer<typeof UserData>

