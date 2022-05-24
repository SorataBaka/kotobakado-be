import { ModifiedResponse } from "../../../types";
import { Request } from "express";
import joi from "joi";
const schema = joi.object({
	kotobaname: joi.string().required(),
	kotobadescription: joi.string().required(),
	kotobalist: joi.array().required(),
});
const singleschema = joi.object({
	question: joi.string().required(),
	answer: joi.string().required(),
});
const invalidrequestbody = (res: ModifiedResponse) => {
	return res.status(400).json({
		message: "Invalid request body",
		status: 400,
		data: null,
	});
};
const internalservererror = (res: ModifiedResponse) => {
	return res.status(500).json({
		message: "Internal server error",
		status: 500,
		data: null,
	});
};
export default async (req: Request, res: ModifiedResponse) => {
	const validate = schema.validate(req.body);
	if (validate.error || req.body["kotobalist"].length === 0)
		return invalidrequestbody(res);
	for (const kotobaobject of req.body.kotobalist) {
		const singlevalidate = singleschema.validate(kotobaobject);
		if (singlevalidate.error) return invalidrequestbody(res);
	}
	const newdocument = await new res.locals.database.schemas.kotoba({
		userid: res.locals.user.id,
		kotobaname: req.body.kotobaname,
		kotobadescription: req.body.kotobadescription,
		kotobalist: req.body.kotobalist,
		kotobacount: req.body.kotobalist.length,
		createdDate: new Date(),
		updatedDate: null,
		deletedDate: null,
	})
		.save()
		.catch(() => {
			return undefined;
		});
	if (newdocument === undefined) return internalservererror(res);
	const save = await newdocument.save().catch(() => {
		return undefined;
	});
	if (save === undefined) return internalservererror(res);
	return res.status(200).json({
		message: "success",
		status: 200,
		data: save,
	});
};
