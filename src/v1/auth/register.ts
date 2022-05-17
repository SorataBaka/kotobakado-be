import { Request } from "express";
import joi from "joi";
import { ModifiedResponse } from "../../../types";
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
export default (req: Request, res: ModifiedResponse) => {
	const validate = validator.validate(req.body);
	if (
		validate.error ||
		!emailregex.test(req.body.email) ||
		!passwordregex.test(req.body.password)
	) {
		return res.status(400).json({
			message: "Invalid request body",
			status: 400,
			data: {
				error: validate.error,
			},
		});
	}

	const requestBody = validate.value;
	return res.status(200).json({
		message: "Ok",
		status: 200,
		data: requestBody,
	});
};
