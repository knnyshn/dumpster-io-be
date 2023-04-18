import { Router } from "express";
import * as controllers from "../controllers/auth.js"

const router = Router()

router.post('/signup', controllers.Signup)
router.post('/signin', controllers.Sign_in)

export default router