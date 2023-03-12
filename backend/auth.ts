import { z } from "zod"
import { Request } from "express"
import { createVerifier } from "fast-jwt"

const SoundifyToken = z.object({
  user_id: z.number(),
  expires: z.number()
})

export type UserAuth = {
  user_id: number
  administrator: boolean
}

const verify = createVerifier({ key: process.env.API_TOKEN })

export function getAuth(req: Request): UserAuth {
  const hasValidCookie = validateCookie(req)

  return {
    user_id: hasValidCookie ? hasValidCookie : 0,
    administrator: false
  }
}

function validateCookie(req: Request): number | void {
  const cookies = req.cookies
  if (!cookies) return

  const soundifyToken = cookies["soundify_token"];
  if (!soundifyToken) return

  const validToken = verify(soundifyToken)

  const parsedToken = SoundifyToken.safeParse(validToken)
  if (!parsedToken.success) return

  const tokenExpired = Date.now() > parsedToken.data.expires
  if (tokenExpired) return

  return parsedToken.data.user_id
}
