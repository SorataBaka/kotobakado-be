import { ModifiedResponse } from "../../../types";
import joi, { ValidationError } from "joi";
import { Request } from "express";
import bcrypt from "bcrypt";
import Crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretkey = process.env.SECRET_KEY;
if (secretkey === undefined)
	throw new Error("SECRET_KEY is not defined in .env file");
const validator = joi.object({
	email: joi.string().email().required(),
	username: joi.string().required(),
	password: joi.string().required(),
});
const emailregex = new RegExp(
	//eslint-disable-next-line
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
	"i"
);
const passwordregex = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
);
const invalidRequestBody = (
	res: ModifiedResponse,
	data: ValidationError | undefined
) => {
	return res.status(400).json({
		message: "Invalid request body",
		status: 400,
		data: data,
	});
};
const requestConflict = (res: ModifiedResponse, message: string) => {
	return res.status(409).json({
		message: message,
		status: 409,
		data: null,
	});
};
export default async (req: Request, res: ModifiedResponse) => {
	const validate = validator.validate(req.body);
	if (
		validate.error ||
		!emailregex.test(req.body.email) ||
		!passwordregex.test(req.body.password)
	)
		return invalidRequestBody(res, validate.error);
	//Validate if the username and email has been taken
	const duplicatequery = await res.locals.database.schemas.user.find({
		$or: [
			{
				emailHash: Crypto.createHash("sha256")
					.update(req.body.email)
					.digest("hex"),
			},
			{ username: req.body.username },
		],
	});
	if (duplicatequery.length > 0)
		return requestConflict(res, "Username or email already taken");

	const passwordHash = await bcrypt.hash(req.body.password, 10);
	const newuser = new res.locals.database.schemas.user({
		username: req.body.username,
		emailHash: Crypto.createHash("sha256").update(req.body.email).digest("hex"),
		passwordHash: passwordHash,
		createdDate: new Date(),
	});
	const newdocument = await newuser.save().catch(() => {
		return undefined;
	});
	if (newdocument === undefined) {
		return res.status(500).json({
			message: "Internal Server Error",
			status: 500,
			data: null,
		});
	}
	const newtoken = jwt.sign(
		{
			id: newdocument._id,
			name: req.body.username,
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
