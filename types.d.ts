import mongoose, { Mongoose } from "mongoose";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface DatabaseInterface {
	mongodb: Mongoose;
	schemas: {
		user: mongoose.Model<User>;
		kotoba: mongoose.Model<Kotoba>;
	};
}
export interface ModifiedResponse extends Response {
	locals: {
		database: DatabaseInterface;
		user: JwtPayload;
	};
}
export interface DatabaseParameters {
	MONGO_URI: string;
}
export interface User extends mongoose.Document {
	username: string;
	emailHash: string;
	passwordHash: string;
	createdDate: Date;
}
export interface Kotoba extends mongoose.Document {
	userid: string;
	kotobaname: string;
	kotobadescription: string;
	kotobalist: {
		question: string;
		answer: string;
	}[];
	kotobacount: number;
	createdDate: Date;
	updatedDate: Date;
	deletedDate: Date;
}
