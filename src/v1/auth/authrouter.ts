import express, { Request, Response, Router } from "express";
import login from "./login";
import register from "./register";
import detail from "./detail";
import refresh from "./refresh";
const authrouter: Router = express.Router();
authrouter.all("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		message: "authroute",
		status: 200,
		data: {
			routes: {
				login: "./login",
				register: "./register",
				detail: "./detail",
				refresh: "./refresh",
			},
		},
	});
});
authrouter.post("/login", login);
authrouter.post("/register", register);
authrouter.get("/detail", detail); //Provide a token in the header
authrouter.get("/refresh", refresh); //provide refresh token in the header

export default authrouter;
