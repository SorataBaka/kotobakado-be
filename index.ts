import express, { NextFunction, Request, Response } from "express";
import versionrouter from "./src/versionroute";
import Database from "./db/dbclass";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
dotenv.config();

const utils = {
	database: new Database({
		MONGO_URI: process.env.MONGO_URI as string,
	}),
};
const prepare = (req: Request, res: Response, next: NextFunction) => {
	res.locals = utils;
	next();
};

app.use(express.json());
app.use(prepare);
app.use(bodyParser.json());
app.use("/api", versionrouter);

app.all("/", (_req: Request, res: Response) => {
	return res.status(200).json({
		message: "Welcome to the API",
		status: 200,
		data: null,
	});
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
