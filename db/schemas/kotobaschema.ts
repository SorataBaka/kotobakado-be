import mongoose from "mongoose";
import { Kotoba } from "../../types";
const schema = new mongoose.Schema<Kotoba>({
	userid: {
		type: String,
		required: true,
	},
	kotobaname: {
		type: String,
		required: true,
	},
	kotobadescription: {
		type: String,
		required: true,
	},
	kotobalist: [
		{
			question: {
				type: String,
				required: true,
			},
			answer: {
				type: String,
				required: true,
			},
		},
	],
	kotobacount: {
		type: Number,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	updatedDate: {
		type: Date,
	},
	deletedDate: {
		type: Date,
	},
});

export default mongoose.model<Kotoba>("kotoba-collection", schema);
