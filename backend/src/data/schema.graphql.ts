import { gql } from 'apollo-server-express';

/**
 * Schema for the GraphQL API. Spesifies paramaters and return types for the different querys and mutations that is supported in the API.
 */

export const typeDefs = gql`
	type Movie {
		adult: Boolean
		backdrop_path: String
		belongs_to_collection: [Collection]
		budget: Int
		genres: [Genre]
		homepage: String
		id: Int
		imdb_id: String
		original_language: String
		original_title: String
		overview: String
		popularity: Float
		poster_path: String
		production_companies: [Production_company]
		production_countries: [Production_country]
		release_date: String
		revenue: Int
		runtime: Int
		spoken_languages: [Language]
		status: String
		tagline: String
		title: String
		video: Boolean
		vote_average: Float
		vote_count: Int
		stars: [Star]
	}

	type Review {
		author: String
		review: String
		reviewId: String
		userId: String
		movie: Int
		timestamp: String
	}

	type Star {
		adult: Boolean
		gender: Int
		id: Int
		known_for_department: String
		name: String
		original_name: String
		popularity: Float
		profile_path: String
		cast_id: Int
		character: String
		credit_id: String
		order: Int
	}

	type Language {
		english_name: String
		iso_639_1: String
		name: String
	}

	type Production_country {
		iso_3166_1: String
		name: String
	}

	type Production_company {
		id: Int
		logo_path: String
		name: String
		origin_contry: String
	}

	type Genre {
		id: Int
		name: String
	}

	type Collection {
		id: Int
		name: String
		poster_path: String
		backdrop_path: String
	}

	type User {
		username: String
		email: String
		password: String
		userId: String
	}

	input UserInput {
		username: String
		password: String
		email: String
	}

	type Query {
		getMovies(sortBy: String, direction: Int, skip: Int, limit: Int, genre: [String]): [Movie]
		getMovie(id: Int): Movie
		getReviews(getBy: String, search: String, skip: Int, limit: Int): [Review]
		getTotalReviews(getBy: String, search: String): Int
		searchMovies(title: String, sortBy: String, direction: Int, skip: Int, limit: Int): [Movie]
		searchAndSortMovies(title: String, skip: Int, limit: Int): [Movie]
		searchActor(star: String, sortBy: String, direction: Int, skip: Int, limit: Int): [Movie]
		searchYear(year: String, sortBy: String, direction: Int, skip: Int, limit: Int): [Movie]
		searchGenre(genre: String, sortBy: String, direction: Int, skip: Int, limit: Int): [Movie]
		loginUser(username: String, password: String): User
		findUserByUsername(username: String): User
	}

	type Mutation {
		createUser(user: UserInput): User
		addReview(author: String, userId: String, movie: Int, review: String): Review
	}
`;
