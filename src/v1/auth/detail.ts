import { Request, Response } from "express";
export default (req: Request, res: Response) => {
	console.log(res.locals.utils);
	res.send("Ok");
};
