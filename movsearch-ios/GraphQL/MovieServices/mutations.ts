import { gql } from 'graphql-tag';

export const CREATE_USER = gql`
	mutation ($user: UserInput!) {
		createUser(user: $user) {
			username
			email
			userId
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation ($author: String!, $userId: String!, $review: String!, $movie: Int!) {
		addReview(author: $author, userId: $userId, review: $review, movie: $movie) {
			author
			review
			movie
		}
	}
`;
