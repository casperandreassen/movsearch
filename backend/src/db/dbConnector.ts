/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { environment } = require('../config/config');
const { movieSchema, userSchema, reviewSchema } = require('./schema');
const env = process.env.NODE_ENV || 'development';

/**
 * Mongoose Connection to the mongodb server.
 **/

mongoose.connect(environment[env].dbString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
	// eslint-disable-next-line no-console
	console.error('Error while connecting to DB');
});

const Movies = mongoose.model('Movies', movieSchema);
const Users = mongoose.model('Users', userSchema);
const Reviews = mongoose.model('Reviews', reviewSchema);

export { Movies, Users, Reviews };
