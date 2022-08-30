import express from "express";
import {
	createProfile,
	getProfile,
	updateProfile,
} from "../controllers/ProfileController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/profile", verifyUser, createProfile);
router.get("/profile/:id", verifyUser, getProfile);
router.patch("/profile/:id", verifyUser, updateProfile);

export default router;
