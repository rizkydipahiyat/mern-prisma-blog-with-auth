import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
	try {
		const profile = await prisma.profile.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(profile);
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const createProfile = async (req, res) => {
	const { bio } = req.body;

	try {
		await prisma.profile.create({
			data: {
				bio: bio,
				userId: Number(req.user.id),
			},
		});
		res.status(201).json("Post Successfully Created!");
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const updateProfile = async (req, res) => {
	const { bio } = req.body;
	try {
		await prisma.profile.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				bio: bio,
			},
		});
		res.status(200).json("Profile Updated Successfully!");
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};
