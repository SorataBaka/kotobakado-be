import { ModifiedResponse } from "../../../types";
import { Request } from "express";
export default (_req: Request, res: ModifiedResponse) => {
	return res.status(200).json({
		message: "success",
		status: 200,
		data: res.locals.user,
	});
};
