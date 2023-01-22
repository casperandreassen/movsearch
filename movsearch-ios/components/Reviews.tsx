import { MovieInterface, ReviewInterface } from '../GraphQL/MovieServices/types';
import MovieScreenReviews from './MovieScreenReviews';
import UserScreenReviews from './UserScreenReviews';
import MovieServices from '../GraphQL/MovieServices';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

type ReviewProps = {
	type: string;
	search: string | undefined;
	userScreen: boolean;
};

/**
 * Contains logic for displaying the format of a review dependant of screen type.
 */

const Reviews = ({ type, search, userScreen }: ReviewProps) => {
	const [reviews, setReviews] = useState<ReviewInterface[]>([]);
	const [alreadyShown, setAlreadyShown] = useState<number>(0);
	const [totalReviews, setTotalReviews] = useState<number>(0);

	/**
	 * For refetching reviews if a user left a new review when it left the page.
	 */
	useFocusEffect(
		React.useCallback(() => {
			getReviews();
		}, [search])
	);

	const getReviews = () => {
		if (search != undefined) {
			MovieServices.getNumberOfReviews(type, search)
				.then((res) => {
					setTotalReviews(res);
				})
				.catch(() => null);
			MovieServices.getReviews(type, search, 0, 20)
				.then((res) => {
					res.forEach((review: ReviewInterface) => {
						MovieServices.getMovie(review.movie)
							.then((result) => {
								review.movieObj = result as MovieInterface;
								setReviews(reviews.concat(res as unknown as ReviewInterface[]));
								setAlreadyShown(res.length);
							})
							.catch((e) => {
								throw Error(e);
							});
					});
				})
				.catch(() => null);
		}
	};

	const loadMoreReviews = () => {
		if (search != undefined) {
			MovieServices.getReviews(type, search, alreadyShown, 20)
				.then((result) => {
					let res = reviews
						?.concat(result as unknown as ReviewInterface[])
						.filter((v, i, a) => a.findIndex((v2) => v2.reviewId === v.reviewId) === i);
					res.forEach((review: ReviewInterface) => {
						MovieServices.getMovie(review.movie)
							.then((result) => {
								review.movieObj = result as MovieInterface;
								setReviews(res as unknown as ReviewInterface[]);
								setAlreadyShown(res.length);
							})
							.catch((e) => {
								throw Error(e);
							});
					});
					setAlreadyShown(res.length);
					setReviews(res);
				})
				.catch(() => null);
		}
	};

	return userScreen ? (
		<UserScreenReviews
			reviews={reviews}
			loadMoreReviews={loadMoreReviews}
			numberOfReviews={totalReviews}
		/>
	) : (
		<MovieScreenReviews
			totalReviews={totalReviews}
			reviews={reviews}
			alreadyShown={alreadyShown}
			loadMoreReviews={loadMoreReviews}
		/>
	);
};

export default Reviews;
