import express, { Request, Response } from "express";
import auth from "../../utils/auth";
import list from "./list";
const userrouter = express.Router();
userrouter.use(auth);
userrouter.all("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		message: "user route",
		status: 200,
		data: {
			routes: {},
		},
	});
});
userrouter.get("/list", list);
export default userrouter;
