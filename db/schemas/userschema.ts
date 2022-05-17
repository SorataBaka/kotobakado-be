import mongoose from "mongoose";
const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	emailHash: {
		type: String,
		required: true,
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
export default mongoose.model("user-collection", schema);
