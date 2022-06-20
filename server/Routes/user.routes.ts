import express, {Request, Response} from "express"
const router = express.Router()



export const userRoutes =router.get("/",(req:Request, res:Response)=>{
    res.send("Good")
})


