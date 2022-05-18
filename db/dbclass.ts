import mongoose, { Mongoose } from "mongoose";
import userschema from "./schemas/userschema";
import { DatabaseInterface, DatabaseParameters, User } from "../types";
import joi from "joi";
const schema = joi.object({
	MONGO_URI: joi.string().required(),
});
export default class Database implements DatabaseInterface {
	public mongodb: Mongoose;
	public schemas: {
		user: mongoose.Model<User>;
	} = {
		user: userschema,
	};
	constructor(param: DatabaseParameters) {
		const validation = schema.validate(param);
		if (validation.error) throw new Error(validation.error.message);
		this.mongodb = mongoose;
		mongoose.connect(param.MONGO_URI);
		mongoose.connection.on("connecting", () => {
			console.log("Connecting to MongoDB Database");
		});
		mongoose.connection.on("connected", () => {
			console.log("Connected to MongoDB Database");
		});
		mongoose.connection.on("error", (err) => {
			console.error(err);
			throw err;
		});
	}
}
