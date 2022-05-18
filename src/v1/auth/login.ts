import { ModifiedResponse } from "../../../types";
import { Request } from "express";
import jwt from "jsonwebtoken";
import Crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import joi from "joi";
dotenv.config();
const secretkey = process.env.SECRET_KEY;
if (secretkey === undefined)
	throw new Error("JWT_SECRET is not defined in .env file");
const invalidRequestBody = (res: ModifiedResponse) => {
	return res.status(400).json({
		message: "Invalid request body",
		status: 400,
		data: null,
	});
};
const validator = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});
const invalidAuthentication = (res: ModifiedResponse) => {
	return res.status(401).json({
		message: "Invalid email or password",
		status: 401,
		data: null,
	});
};
export default async (req: Request, res: ModifiedResponse) => {
	const validate = validator.validate(req.body);
	if (validate.error) return invalidRequestBody(res);
	const emailhash = Crypto.createHash("sha256")
		.update(req.body.email)
		.digest("hex");
	const user = await res.locals.database.schemas.user.find({
		emailHash: emailhash,
	});
	if (user.length === 0) return invalidAuthentication(res);
	const passwordHash = user[0].passwordHash;
	const match = await bcrypt.compare(req.body.password, passwordHash);
	if (!match) return invalidAuthentication(res);
	const newtoken = jwt.sign(
		{
			id: user[0]._id,
			name: user[0].username,
			nbf: Math.floor(Date.now() / 1000),
			iat: Math.floor(Date.now() / 1000),
		},
		secretkey,
		{
			algorithm: "HS256",
			expiresIn: "14d",
			issuer: "https://api.kotobakado.com",
			audience: "https://kotobakado.com",
		}
	);
	return res.status(200).json({
		message: "Ok",
		status: 200,
		data: {
			token: newtoken,
		},
	});
};
