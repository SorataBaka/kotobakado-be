import { ModifiedResponse } from "../../../types";
import { Request } from "express";
const internalservererror = (res: ModifiedResponse) => {
	return res.status(500).json({
		message: "Internal server error",
		status: 500,
		data: null,
	});
};
export default async (_req: Request, res: ModifiedResponse) => {
	const userkotobalist = await res.locals.database.schemas.kotoba
		.find({
			userid: res.locals.user.id,
		})
		.catch(() => {
			return undefined;
		});
	if (userkotobalist === undefined) return internalservererror(res);
	return res.status(200).json({
		message: "success",
		status: 200,
		data: Array.from(
			userkotobalist.map((kotoba) => {
				return {
					id: kotoba._id,
					kotobaname: kotoba.kotobaname,
					kotobadescription: kotoba.kotobadescription,
					kotobacount: kotoba.kotobacount,
					createdat: kotoba.createdDate,
					updatedat: kotoba.updatedDate,
				};
			})
		),
	});
};
