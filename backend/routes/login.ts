import express, { Request, Response } from "express";
import prismaclient from "../lib/prismaclient";
import SHA256 from "crypto-js/sha256";
import { z } from "zod";
import { createSigner } from "fast-jwt";

const router = express.Router();

const loginRequest = z.object({
  username: z.string(),
  password: z.string(),
})

router.post("/", async (
  req: Request, 
  res: Response
) => {
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

  const userToken = jwtSigner({ 
    user_id: user.user_id,
  })

  res.cookie("soundify_token", userToken, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 2 * 3600000) 
  })
  res.status(200).json({ user_id: user.user_id })
});

export default router;

