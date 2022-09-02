import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req, res) => {
	const { password } = req.body;
	try {
		const salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		const user = await prisma.user.create({
			data: {
				...req.body,
				password: hash,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(401).json({ msg: error.message });
	}
};

export const login = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user)
			return res.status(404).json({ message: "Sorry, user not found!" });

		const isPasswordMatch = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordMatch)
			return res.status(400).json({ message: "Wrong password and email!" });

		const token = jwt.sign({ id: user.id }, process.env.JWT);

		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({
				id: user.id,
				name: user.name,
				email: user.email,
				password: user.password,
				token,
			});
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};
