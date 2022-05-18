import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import joi from "joi";
const secretkey = process.env.SECRET_KEY;
const tokenType = process.env.TOKEN_TYPE;
const issuer = process.env.TOKEN_ISSUER;
const audience = process.env.TOKEN_AUDIENCE;
if (secretkey === undefined || tokenType === undefined)
	throw new Error("SECRET_KEY or TOKEN_TYPE is not defined in .env file");
const invalidRequest = (res: Response) => {
	return res.status(400).json({
		message: "Invalid request",
		status: 400,
		data: null,
	});
};
const notFound = (res: Response) => {
	return res.status(404).json({
		message: "Not found",
		status: 404,
		data: null,
	});
};
const tokenverifier = joi.object({
	id: joi.string().required(),
	name: joi.string().required(),
	nbf: joi.number().required(),
	iat: joi.number().required(),
	exp: joi.number().required(),
	aud: joi.string().required(),
	iss: joi.string().required(),
});
export default async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["authorization"];
	if (token === undefined) return invalidRequest(res);
	const tokenSplit = token.split(" ");
	if (tokenSplit.length !== 2) return invalidRequest(res);
	if (tokenSplit[0] !== tokenType) return invalidRequest(res);
	try {
		const decoded = jwt.verify(tokenSplit[1], secretkey);
		if (typeof decoded !== "object" || decoded === undefined)
			throw new Error("Invalid token");
		const validate = tokenverifier.validate(decoded);
		if (validate.error) return invalidRequest(res);

		const today = Date.now() / 1000;
		if (
			(decoded.exp as number) < today ||
			(decoded.iat as number) > today ||
			(decoded.nbf as number) > today ||
			decoded.aud !== audience ||
			decoded.iss !== issuer ||
			decoded.id === undefined
		)
			return invalidRequest(res);
		const userid = decoded.id;
		const userdata = await res.locals.database.schemas.user
			.find({
				_id: userid,
			})
			.catch(() => {
				return false;
			});
		if (userdata === false)
			return res.status(500).json({
				message: "Internal server error",
				status: 500,
				data: null,
			});
		if (userdata === undefined || userdata === null || userdata.length === 0)
			return notFound(res);
		res.locals.user = {
			id: userdata[0]._id,
			username: userdata[0].username,
			emailHash: userdata[0].emailHash,
		};
		return next();
	} catch (e) {
		return res.status(401).json({
			message: "Invalid Request",
			status: 401,
			data: null,
		});
	}
};
