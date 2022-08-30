import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPostById = async (req, res) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const getAllPost = async (req, res) => {
	try {
		const posts = await prisma.post.findMany();
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const getMyPosts = async (req, res) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				authorId: Number(req.user.id),
			},
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const createPost = async (req, res) => {
	const { title, content } = req.body;

	try {
		const post = await prisma.post.create({
			data: {
				title: title,
				content: content,
				authorId: Number(req.user.id),
			},
		});
		res.status(201).json(post);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { title, content, published } = req.body;
	try {
		const post = await prisma.post.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				title: title,
				content: content,
				published: published,
			},
		});
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		await prisma.post.delete({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json("Post Deleted Successfully!");
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};
