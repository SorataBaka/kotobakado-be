import { ModifiedResponse } from "../../../types";
import { Request } from "express";
export default (req: Request, res: ModifiedResponse) => {
	return res.send(res.locals.user);
};
