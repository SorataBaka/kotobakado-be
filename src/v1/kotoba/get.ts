import { ModifiedResponse } from "../../../types";
import { Request } from "express";
const internalservererror = (res: ModifiedResponse) => {
	return res.status(500).json({
		message: "Internal server error",
		status: 500,
		data: null,
	});
};
export default async (req: Request, res: ModifiedResponse) => {
	const kotobaid = req.params.id || undefined;
	if (kotobaid === undefined)
		return res.status(400).json({
			message: "Invalid Request",
			status: 400,
			data: null,
		});
	const userkotobalist = await res.locals.database.schemas.kotoba
		.find({
			_id: kotobaid,
		})
		.catch(() => {
			return undefined;
		});
	if (userkotobalist === undefined) return internalservererror(res);
	if (userkotobalist.length === 0)
		return res.status(404).json({
			message: "Not Found",
			status: 404,
			data: null,
		});
	return res.status(200).json({
		message: "success",
		status: 200,
		data: userkotobalist[0],
	});
};
