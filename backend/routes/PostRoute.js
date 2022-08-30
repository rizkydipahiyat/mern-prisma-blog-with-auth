import express from "express";
import {
	createPost,
	deletePost,
	getAllPost,
	getMyPosts,
	getPostById,
	updatePost,
} from "../controllers/PostController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/posts", getAllPost);
router.get("/post/:id", getPostById);
router.get("/mypost", verifyUser, getMyPosts);
router.patch("/post/:id", verifyUser, updatePost);
router.delete("/post/:id", verifyUser, deletePost);

export default router;
