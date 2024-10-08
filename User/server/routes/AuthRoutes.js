import { Router } from "express";
import { addProfileImage, getUserInfo, login, logout, removeProfileImage, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddeware.js";
import multer from "multer"


const authRoutes = Router()
const upload = multer({dest:"uploads/profiles/"})
authRoutes.post('/login',login)
authRoutes.get('/user-info',verifyToken,getUserInfo)
authRoutes.post('/update-profile',verifyToken,updateProfile)
authRoutes.post('/add-profile-image',verifyToken,upload.single("profile-image"),addProfileImage)


authRoutes.delete('/remove-profile-image',verifyToken,removeProfileImage)
authRoutes.post('/logout',logout)
export default authRoutes


