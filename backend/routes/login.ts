import express, { Request, Response } from "express";
import prismaclient from "../lib/prismaclient";
import SHA256 from "crypto-js/sha256";
import { z } from "zod";
import { createSigner } from "fast-jwt";
import { getAuth } from "../auth";

const router = express.Router();

const loginRequest = z.object({
  username: z.string(),
  password: z.string(),
})

router.post("/", async (
  req: Request, 
  res: Response
) => {
  const auth = getAuth(req)
  if (auth.user_id) {
    const user = await prismaclient.user.findFirst({
      where: {
       user_id: auth.user_id
      },
      include: {
        playlist: true
      }
    })

    if (!user) {
      res.status(500).json({ error: "Internal server error"})
      return 
    }

    res.status(200).json({
      username: user.username,
      user_id: user.user_id
    })
    return
  }

  const parsedBody = loginRequest.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ error: "Bad request" });
    return
  };

  const user = await prismaclient.user.findFirst({
    where: {
       username: parsedBody.data.username
    }
  })

  if (!user) {
    res.status(401).json({ error: "Incorrect username or password" });
    return;
  };

  if (user.password !== SHA256(parsedBody.data.password).toString()) {
    res.status(401).json({ error: "Incorrect username or password" });
    return;
  }

  const apiToken = process.env.API_TOKEN

  if (!apiToken) {
    throw new Error("No token is defined in env")
  }

  const jwtSigner = createSigner({ key: apiToken })

  const tokenExpires = Date.now() + 2 * 3600000

  const userToken = jwtSigner({ 
    user_id: user.user_id,
    expires: tokenExpires 
  })

  res.cookie("soundify_token", userToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(tokenExpires) 
  })

  res.status(200).json({ 
    user_id: user.user_id,
    username: user.username
  })
});

export default router;

