import { apolloClient } from '../index';
import { GetUser, MovieInterface, ReviewInterface, search, UserInput } from './types';
import {
	GET_MOVIE,
	GET_MOVIES,
	GET_NUMBER_OF_REVIEWS,
	GET_REVIEWS,
	LOGIN_USER,
	SEARCH_MOVIES
} from './queries';
import { CREATE_REVIEW, CREATE_USER } from './mutations';

/**
 * Class that has different methods for sending different request to the API
 */
class MovieServices {
	/**
	 * SearchMovies is the generic method for searching for title, actor, year and genre.
	 *
	 * @param title what is searched for
	 * @param sortBy what the user wants to sort the content by
	 * @param direction increasing / decreasing (-1 / 1)
	 * @param skip elements to skip over. Used to implement infinite scroll
	 * @param limit limits the number of results sent by the backend.
	 * @returns a promise that may or may not contain the movies requested
	 */
	async searchMovies(
		title: String,
		sortBy: String,
		direction: number,
		skip: number,
		limit: number
	): Promise<search['Movie']> {
		const response = await apolloClient.query({
			query: SEARCH_MOVIES,
			variables: { title, sortBy, direction, skip, limit },
			fetchPolicy: 'no-cache'
		});
		if (!response || !response.data) throw new Error('Cannot get movie!');

		return response.data.searchMovies;
	}

	/**
	 * getMovies sort the entire collection. Makes it possible to get the most popular movies in the database etc.
	 *
	 * @param sortBy what to sort the movies by
	 * @param direction increasing / decreasing (-1 / 1)
	 * @param skip elements to skip over. Used to implement infinite scroll
	 * @param limit limits the number of results sent by the backend.
	 * @param genre list of genres to filter the result by
	 * @returns a promise that may or may not contain the movies requested.
	 */

	async getMovies(
		sortBy: String,
		direction: number,
		skip: number,
		limit: number,
		genre: String[]
	): Promise<search['Movie']> {
		const response = await apolloClient.query({
			query: GET_MOVIES,
			variables: { sortBy, direction, skip, limit, genre }
		});

		if (!response || !response.data) throw new Error('Cannot get movies!');

		return response.data.getMovies;
	}

	/**
	 * loginUser logs in a user with username and password.
	 *
	 * @param username username for the user to log in
	 * @param password password for the user to log in
	 * @returns the response from backend
	 */
	async loginUser(username: String, password: String): Promise<GetUser['User']> {
		const response = await apolloClient.query({
			query: LOGIN_USER,
			variables: { username, password }
		});

		if (!response || !response.data) throw new Error('Cannot get User!');

		return response.data.loginUser;
	}

	/**
	 * getMovie requests a single movie object from the database.
	 *
	 * @param id of the movie to get
	 * @returns a Promise that may or may not contain the movie requested.
	 */
	async getMovie(id: number): Promise<MovieInterface> {
		const response = await apolloClient.query({
			query: GET_MOVIE,
			variables: { id }
		});

		if (!response || !response.data) throw new Error('Cannot get movies!');

		return response.data.getMovie;
	}

	/**
	 * Requests the backend to create a user.
	 *
	 * @param user the user to create
	 * @returns the response from the API
	 */
	async createUser(user: UserInput): Promise<GetUser['User']> {
		const response = await apolloClient.mutate({
			mutation: CREATE_USER,
			variables: { user }
		});

		if (!response || !response.data) throw new Error('Cannot get User!');

		return response.data.createUser;
	}

	/**
	 * Requests all reviews that is linked to a spesific movie or user.
	 *
	 * @param movie the movie id to get reviews for
	 * @returns The response from the API
	 */

	async getReviews(
		getBy: string,
		convert: string | number,
		skip: number,
		limit: number
	): Promise<ReviewInterface[]> {
		let search = String(convert);
		const response = await apolloClient.query({
			query: GET_REVIEWS,
			variables: { getBy, search, skip, limit },
			fetchPolicy: 'no-cache'
		});

		if (!response || !response.data) throw new Error('Cannot get movies!');

		return response.data.getReviews;
	}

	/**
	 * Gets the number of reviews.
	 *
	 * @param getBy user or movie
	 * @param convert what is to be searched for
	 * @returns a promise that contains the number of reviews for a specific movie.
	 */
	async getNumberOfReviews(getBy: string, convert: string | number): Promise<number> {
		let search = String(convert);
		const response = await apolloClient.query({
			query: GET_NUMBER_OF_REVIEWS,
			variables: { getBy, search },
			fetchPolicy: 'no-cache'
		});
		if (!response || !response.data) throw new Error('Cannot get movies!');

		return response.data.getTotalReviews;
	}

	/**
	 * Reqests the backend to create a review
	 *
	 * @param author the account that wrote the review
	 * @param review the review
	 * @param movie movie id the review is for
	 * @param userId useraccount that is leaving the review.
	 * @returns the response from the API
	 */

	async createReview(
		author: String,
		userId: String,
		review: String,
		movie: number
	): Promise<ReviewInterface> {
		const response = await apolloClient.mutate({
			mutation: CREATE_REVIEW,
			variables: { author, userId, review, movie },
			fetchPolicy: 'no-cache'
		});

		if (!response || !response.data) throw new Error('Cannot insert review!');

		return response.data.createReview;
	}
}

export default new MovieServices();
