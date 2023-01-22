import { gql } from 'graphql-tag';

/**
 * Tags / queries for sending requests to backend. Used in MovieServices/index.ts to expose methods for fetching data.
 */

export const SEARCH_MOVIES = gql`
	query ($title: String!, $sortBy: String!, $direction: Int!, $skip: Int!, $limit: Int!) {
		searchMovies(
			title: $title
			sortBy: $sortBy
			direction: $direction
			skip: $skip
			limit: $limit
		) {
			genres {
				name
			}
			id
			original_title
			overview
			popularity
			poster_path
			release_date
			backdrop_path
			runtime
			vote_average
			stars {
				name
				popularity
				profile_path
				character
			}
		}
	}
`;

export const SEARCH_MOVIES_AND_SORT = gql`
	query ($title: String!, $sortBy: String!, $direction: Int!, $skip: Int!, $limit: Int!) {
		searchAndSortMovies(
			title: $title
			sortBy: $sortBy
			direction: $direction
			skip: $skip
			limit: $limit
		) {
			genres {
				name
			}
			id
			original_title
			overview
			popularity
			poster_path
			release_date
			runtime
			stars {
				name
				popularity
			}
		}
	}
`;

export const SEARCH_ACTOR = gql`
	query ($star: String!, $sortBy: String!, $direction: Int!, $skip: Int!, $limit: Int!) {
		searchActor(title: $title, sortBy: $sortBy, direction: $direction, skip: $skip, limit: $limit) {
			genres {
				name
			}
			id
			original_title
			overview
			popularity
			poster_path
			release_date
			runtime
			stars {
				name
				popularity
			}
		}
	}
`;

export const GET_REVIEWS = gql`
	query ($getBy: String!, $search: String!, $skip: Int!, $limit: Int!) {
		getReviews(getBy: $getBy, search: $search, skip: $skip, limit: $limit) {
			author
			review
			movie
			reviewId
			userId
			timestamp
		}
	}
`;

//Denne er muligens feil!
export const GET_MOVIES = gql`
	query ($sortBy: String!, $direction: Int!, $skip: Int!, $limit: Int!, $genre: [String!]!) {
		getMovies(sortBy: $sortBy, direction: $direction, skip: $skip, limit: $limit, genre: $genre) {
			genres {
				name
			}
			id
			original_title
			overview
			popularity
			poster_path
			release_date
			backdrop_path
			runtime
			vote_average
			stars {
				name
				popularity
				profile_path
				character
			}
		}
	}
`;

export const GET_MOVIE = gql`
	query ($id: Int!) {
		getMovie(id: $id) {
			genres {
				name
			}
			id
			original_title
			overview
			popularity
			poster_path
			release_date
			backdrop_path
			runtime
			vote_average
			stars {
				name
				popularity
				profile_path
				character
			}
		}
	}
`;

export const LOGIN_USER = gql`
	query ($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			username
			password
			userId
		}
	}
`;

export const GET_NUMBER_OF_REVIEWS = gql`
	query ($getBy: String!, $search: String!) {
		getTotalReviews(getBy: $getBy, search: $search)
	}
`;

/* export const FIND_USER = gql`
    query ($username: String!) {
        findUserByUsername(username: $username) {
            username
            password
            userId
        }
    }
`; */
