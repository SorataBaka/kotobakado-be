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
	const pagequery = req.query["page"]
		? parseInt(req.query["page"] as string, 10)
		: 1;
	const kotobalist = await res.locals.database.schemas.kotoba
		.find({ deletedDate: null })
		.limit(10)
		.sort("-createdDate")
		.skip((pagequery - 1) * 10)
		.catch(() => {
			return undefined;
		});
	if (kotobalist === undefined) return internalservererror(res);
	return res.status(200).json({
		message: "success",
		status: 200,
		data: Array.from(
			kotobalist.map((kotoba) => {
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
