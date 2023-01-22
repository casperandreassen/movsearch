/**
 * TS type for a movie
 */

export type MovieModel = {
	adult: Boolean;
	backdrop_path: String;
	belongs_to_collection: [
		{
			id: number;
			name: String;
			poster_path: String;
			backdrop_path: String;
		}
	];
	budget: number;
	genres: [
		{
			id: number;
			name: String;
		}
	];
	homepage: String;
	id: number;
	imdb_id: String;
	original_language: String;
	original_title: String;
	overview: String;
	popularity: number;
	poster_path: String;
	production_companies: [
		{
			id: number;
			logo_path: String;
			name: String;
			origin_contry: String;
		}
	];
	production_countries: [
		{
			iso_3166_1: String;
			name: String;
		}
	];
	release_date: String;
	revenue: number;
	runtime: number;
	spoken_languages: [
		{
			english_name: String;
			iso_639_1: String;
			name: String;
		}
	];
	status: String;
	tagline: String;
	title: String;
	video: Boolean;
	vote_average: number;
	vote_count: number;
	stars: [
		{
			adult: Boolean;
			gender: number;
			id: number;
			known_for_department: String;
			name: String;
			original_name: String;
			popularity: number;
			profile_path: String;
			cast_id: number;
			character: String;
			credit_id: String;
			order: number;
		}
	];
};
