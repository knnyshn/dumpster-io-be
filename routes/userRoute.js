import { Router } from "express";
import * as controller from "../controllers/userController.js";
import UserUpdateProfile from "../controllers/userProfile.js";
import middleAuth from '../middleware/verifyAuth.js'

const router = Router()

router.patch('/profile/:id', middleAuth, UserUpdateProfile)
router.get('/:id', controller.getUser)

export default router