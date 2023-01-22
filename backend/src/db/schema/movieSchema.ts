

// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

/**
 * Mongoose movieshema for mapping incoming and outgoing data to the document model movies in the db.
 */

export const movieSchema = new mongoose.Schema({
	adult: Boolean,
	backdrop_path: String,
	belongs_to_collection: [
		{
			id: Number,
			name: String,
			poster_path: String,
			backdrop_path: String
		}
	],
	budget: Number,
	genres: [
		{
			id: Number,
			name: String
		}
	],
	homepage: String,
	id: Number,
	imdb_id: String,
	original_language: String,
	original_title: String,
	overview: String,
	popularity: Number,
	poster_path: String,
	production_companies: [
		{
			id: Number,
			logo_path: String,
			name: String,
			origin_contry: String
		}
	],
	production_countries: [
		{
			iso_3166_1: String,
			name: String
		}
	],
	release_date: String,
	revenue: Number,
	runtime: Number,
	spoken_languages: [
		{
			english_name: String,
			iso_639_1: String,
			name: String
		}
	],
	status: String,
	tagline: String,
	title: String,
	video: Boolean,
	vote_average: Number,
	vote_count: Number,
	stars: [
		{
			adult: Boolean,
			gender: Number,
			id: Number,
			known_for_department: String,
			name: String,
			original_name: String,
			popularity: Number,
			profile_path: String,
			cast_id: Number,
			character: String,
			credit_id: String,
			order: Number
		}
	]
});
