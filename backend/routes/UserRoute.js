import express from "express";
import {
	getUserById,
	getUserProfile,
	updateUserProfile,
} from "../controllers/UserController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/users/:id", verifyUser, getUserProfile);
router
	.route("/users/profile")
	.get(verifyUser, getUserProfile)
	.patch(verifyUser, updateUserProfile);

router.route("/users/:id").get(verifyUser, getUserById);

export default router;
