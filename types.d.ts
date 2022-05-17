import mongoose, { Mongoose } from "mongoose";
import { Response } from "express";
export interface DatabaseInterface {
	mongodb: Mongoose;
	schemas: {
		user: mongoose.Model<mongoose.Document>;
	};
}
export interface ModifiedResponse extends Response {
	locals: {
		database: DatabaseInterface;
	};
}
export interface DatabaseParameters {
	MONGO_URI: string;
}
