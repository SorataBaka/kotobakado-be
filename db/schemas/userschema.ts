import mongoose from "mongoose";
import { User } from "../../types";
const schema = new mongoose.Schema<User>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	emailHash: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
});
export default mongoose.model<User>("user-collection", schema);
