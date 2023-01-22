/**
 * TS type for review
 */

export type ReviewModel = {
	author: string;
	userId: string;
	reviewId?: string;
	movie: number;
	review: string;
	timestamp?: string;
};
