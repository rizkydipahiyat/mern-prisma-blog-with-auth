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
router.get("/mypost", verifyUser, getMyPosts);
router
	.route("/post/:id")
	.get(getPostById)
	.patch(verifyUser, updatePost)
	.delete(verifyUser, deletePost);

export default router;
