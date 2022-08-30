import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getUserProfile = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(req.user.id),
			},
			include: {
				posts: true,
				profile: true,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const updateUserProfile = async (req, res) => {
	const { email, name, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		const user = await prisma.user.update({
			where: {
				id: Number(req.user.id),
			},
			data: {
				name: name,
				email: email,
				password: hash,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};
