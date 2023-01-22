import { Movies, Users, Reviews } from '../db';
import { MovieModel, UserModel, ReviewModel } from '../model';
import { v4 as uuidv4 } from 'uuid';

export const resolvers = {
	Query: {
		/**
		 * Returns all movies in database, it can also sort movies based on one or more genres.
		 *
		 * @param root
		 * @param query search query from graphql
		 * @returns Sorted list of all movies in database
		 */

		getMovies: (root: any, query: any) => {
			let filter = {};
			filter[query.sortBy] = query.direction;
			if (query.genre.length == 0) {
				return new Promise((resolve, reject) => {
					Movies.find((err: any, movies: MovieModel[]) => {
						if (err) reject(err);
						else resolve(movies);
					})
						.sort(filter)
						.skip(query.skip)
						.limit(query.limit);
				});
			} else {
				let genreFilter = {
					'genres.name': {
						$all: query.genre
					}
				};
				return new Promise((resolve) => {
					Movies.find(genreFilter)
						.sort(filter)
						.skip(query.skip)
						.limit(query.limit)
						.then((movies) => {
							resolve(movies);
						});
				});
			}
		},

		/**
		 * Query for requesting a single movie
		 *
		 * @param root
		 * @param query id of the movie to find
		 * @returns a movie
		 */

		getMovie: (root: any, query: any) => {
			return new Promise((resolve, reject) => {
				Movies.findOne({ id: query.id }, (err: any, movie: MovieModel) => {
					if (err) reject(err);
					else resolve(movie);
				});
			});
		},

		/**
		 * Searches a text index on the title field of movies.
		 *
		 * @param root
		 * @param query query paramaters.
		 * @returns list of movie objects that match the search query.
		 */

		searchMovies: (root: any, query: any) => {
			let filter = {};
			filter[query.sortBy] = query.direction;
			return new Promise((resolve, reject) => {
				Movies.aggregate(
					[
						{ $match: { $text: { $search: query.title.toLowerCase() } } },
						{ $sort: { score: { $meta: 'textScore' } } },
						{ $skip: query.skip },
						{ $limit: query.limit },
						{ $sort: { vote_count: -1 } }
					],
					(err: any, movie: MovieModel) => {
						if (err) reject(err);
						else resolve(movie);
					}
				);
			});
		},

		/**
		 * Returns all reviews for a movie(movieId) or user(userId)
		 *
		 *
		 * @param root
		 * @param query search query from graphql
		 * @returns list of all reviews belonging to specified movie
		 */

		getReviews: (root: any, query: any) => {
			let getBy = {};
			getBy[query.getBy] = query.search;
			return new Promise((resolve) => {
				Reviews.find(getBy)
					.sort({ timestamp: -1 })
					.skip(query.skip)
					.limit(query.limit)
					.then((reviews) => {
						resolve(reviews);
					});
			});
		},

		/**
		 * Returns total number of reviews for a movie
		 *
		 * getTotalReviews(movie: ID of movie)
		 *
		 * @param root
		 * @param query search query from graphql
		 * @returns number of reviews belonging to specified movie
		 */
		getTotalReviews: (root: any, query: any) => {
			let getBy = {};
			getBy[query.getBy] = query.search;
			return new Promise((resolve) => {
				Reviews.find(getBy)
					.countDocuments()
					.then((count) => {
						resolve(count);
					});
			});
		},

		/**
		 * Login for users. If username and password provided match a user in the DB, then the user object is returned. If no such user exists null is returned.
		 *
		 * @param query username and password from frontend
		 * @returns either the authenticated user object or null.
		 */

		loginUser: (root: any, query: any) => {
			return new Promise((resolve, reject) => {
				Users.findOne(
					{ username: query.username, password: query.password },
					(err: any, user: UserModel) => {
						if (err) reject(err);
						else resolve(user);
					}
				);
			});
		}
	},

	Mutation: {
		/**
		 * createUser takes inn a user object and stores it in the users collection in the mongodb database with a userid.
		 *
		 * @param root
		 * @param param1 username and password from the frontend.
		 * @returns the created user object
		 */
		createUser: (root: any, { user }) => {
			user['userId'] = uuidv4();
			const { ...rest } = user;
			const newUser = new Users({
				...rest
			});
			return new Promise((resolve, reject) => {
				Users.find({ username: user.username }, (err: any, user: UserModel[]) => {
					if (err) reject(err);
					if (user.length == 0) {
						newUser.save((err: any, new_user: UserModel) => {
							if (err) reject(err);
							else resolve(new_user);
						});
					} else {
						resolve(null);
					}
				});
			});
		},

		/**
		 * Adds a new review in database
		 *
		 * addReview(author: "name", review: "description", movie: "MovieID", userId: UUID)
		 *
		 * @param root
		 * @param movieID, review and author from frontend
		 * @returns new review
		 */
		addReview: (root: any, review: ReviewModel) => {
			review['reviewId'] = uuidv4();
			review['timestamp'] = String(Date.now());
			const { ...rest } = review;
			const newReview = new Reviews({
				...rest
			});

			return new Promise((resolve, reject) => {
				newReview.save((err: any, review: ReviewModel) => {
					if (err) reject(err);
					resolve(review);
				});
			});
		}
	}
};
