// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

/**
 * Mongoose schema for mapping incoming and outgoing data to the review document model in DB.
 */

export const reviewSchema = new mongoose.Schema({
	author: {
		type: String
	},
	review: {
		type: String
	},
	userId: {
		type: String
	},
	movie: {
		type: Number
	},
	reviewId: {
		type: String
	},
	timestamp: {
		type: String
	}
});
