import { Router } from "express";
import userRouter from './user.js'
import contentRouter from './content.js'

const router = Router()

router.use(userRouter)
router.use("/content", contentRouter)

export default router