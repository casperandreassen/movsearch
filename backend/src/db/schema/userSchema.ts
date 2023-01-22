// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

/**
 * Mongoose usershema for mapping incoming and outgoing data to the document model for users in the db.
 */

export const userSchema = new mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	userId: {
		type: String
	}
});
