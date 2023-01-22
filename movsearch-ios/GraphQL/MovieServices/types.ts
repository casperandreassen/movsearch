/**
 * Intefaces used to represent objects in the react app.
 */

export interface Language {
	english_name: String;
	iso_639_1: String;
	name: String;
}

export interface Production_country {
	iso_3166_1: String;
	name: String;
}

export interface Production_company {
	id: Number;
	logo_path: String;
	name: String;
	origin_contry: String;
}

export interface Genre {
	id: Number;
	name: String;
}

export interface Collection {
	id: Number;
	name: String;
	poster_path: String;
	backdrop_path: String;
}

export interface User {
	username: String;
	password: String;
	userId: String;
}

export interface getUser_User {
	__typename: 'User';
	media: User | null;
}

export interface GetUser {
	User: User | null;
}

export interface UserInput {
	username: String;
	password: String;
	email: String;
}

export interface ReviewInterface {
	author: String;
	review: String;
	movie: number;
	reviewId: String;
	userId: String;
	timestamp: Number;
	movieObj: MovieInterface;
}

export interface getReviews_review {
	__typename: 'Review';
	media: (ReviewInterface | null)[] | null;
}

export interface getReviews {
	Review: getReviews_review | null;
}

export interface GetReviewsResponse {
	getReviews: ReviewInterface[];
}

export interface GetNumberOfReviewsResponse {
	getTotalReviews: number;
}

export interface MovieInterface {
	__typename: 'Media';
	adult: Boolean;
	backdrop_path: String;
	belongs_to_collection: [Collection];
	budget: Number;
	genres: [Genre];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: [Production_company];
	production_countries: [Production_country];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: [Language];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	stars: [Star];
}

export interface search_movie {
	__typename: 'Movie';
	media: (MovieInterface | null)[] | null;
}

export interface search {
	Movie: search_movie | null;
}

export interface Star {
	adult: Boolean;
	gender: Number;
	id: Number;
	known_for_department: String;
	name: String;
	original_name: String;
	popularity: Number;
	profile_path: String;
	cast_id: Number;
	character: String;
	credit_id: String;
	order: Number;
}
