import { Request } from "express";
import { ModifiedResponse } from "../../../types";
import dotenv from "dotenv";
// import joi from "joi";
dotenv.config();
const secretkey = process.env.SECRET_KEY;
if (secretkey === undefined)
	throw new Error("JWT_SECRET is not defined in .env file");
// const invalidRequestBody = (res: ModifiedResponse) => {
// 	return res.status(400).json({
// 		message: "Invalid request body",
// 		status: 400,
// 		data: null,
// 	});
// };
// const validate = joi.object({
// 	email: joi.string().email().required(),
// 	password: joi.string().required(),
// });
export default (_req: Request, res: ModifiedResponse) => {
	return res.send("Ok");
};
