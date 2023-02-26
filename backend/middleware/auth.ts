import express, { Request, Response} from "express";

const router = express.Router();

router.use("/", async (
    req: Request,
    res: Response,
    next
) => {
    console.log("passed middleware");
    next()
})

export default router; 
