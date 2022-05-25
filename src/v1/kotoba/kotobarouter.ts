import express, { Request, Response } from "express";
import auth from "../../utils/auth";
import save from "./save";
import userlist from "./list";
import kotobadetail from "./get";
const kotobarouter = express.Router();
kotobarouter.use(auth);
kotobarouter.all("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		message: "kotoba route",
		status: 200,
		data: {
			routes: {
				save: "./save",
				userlist: "./userlist",
				kotobadetail: "./get/:id",
			},
		},
	});
});
kotobarouter.post("/save", save);
kotobarouter.get("/list", userlist);
kotobarouter.get("/detail/:id", kotobadetail);
export default kotobarouter;
