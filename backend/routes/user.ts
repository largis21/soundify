import express, { Request, Response } from "express";
import prismaclient from "../lib/prismaclient";
import authMiddleware from "../middleware/auth";
import SHA256 from "crypto-js/sha256"

const router = express.Router();

type UserResponse = {
    username?: string;
    error?: string;
};

router.get("/", authMiddleware, async (
    req: Request, 
    res: Response<UserResponse[]>
) => {
    console.log("All users") 
});

router.get("/:id", async (
    req: Request, 
    res: Response<UserResponse>
) => {
    const { id: slugId = "" } = req.params

    const user = await prismaclient.user.findUnique({
        where: {
            user_id: parseInt(slugId)
        }
    })

    if (!user) {
        res.status(404).json({ error: "Couldn't find user"})
    }
    
    res.status(200).json({ username: slugId });
});

type NewUserResponse= {
    user_id?: number;
    error?: string;
};

router.post("/", async (
    req: Request,
    res: Response<NewUserResponse>
) => {
    const { username = "", password = ""} = req.body

    if (!username || !password) {
        res.status(400).json({ error: "Bad request"})
        return
    }
   
    const newUser = await createNewUser(username, password)
    
    if (!newUser) {
        res.status(500).json({ error: "Internal server error"})
        return
    }
   
    res.status(201).json({ user_id: newUser});
});

async function createNewUser(username: string, password: string): Promise<number | void> {
    const newUser = await prismaclient.user.create({
        data: {
            username: username,
            password: SHA256(password).toString(),
        }
    })    
    
    if (!newUser) return

    return newUser.user_id
}

export default router;

