import { ReviewInterface } from '../GraphQL/MovieServices/types';
import { View, Text, StyleSheet, Appearance } from 'react-native';
import { Button } from 'react-native-elements';

type MovieScreenReviewsProps = {
	totalReviews: number;
	reviews: ReviewInterface[];
	alreadyShown: number;
	loadMoreReviews: () => void;
};

/**
 * Variant of review component for the movie-details page.
 */

const MovieScreenReviews = ({
	totalReviews,
	reviews,
	alreadyShown,
	loadMoreReviews
}: MovieScreenReviewsProps) => {
	const renderBottomOrdament = () => {
		if (totalReviews == 0) {
			return (
				<Text style={[styles.darkMode, styles.endOrdanmentText]}>
					Be the first one to review this movie!
				</Text>
			);
		} else if (totalReviews <= alreadyShown) {
			return <Text style={[styles.darkMode, styles.endOrdanmentText]}>No more reviews</Text>;
		} else {
			return <Button title="Load more reviews" onPress={loadMoreReviews}></Button>;
		}
	};

	return (
		<>
			{reviews.map((review) => {
				let reviewDate = new Date(Number(review.timestamp));
				let dateString =
					reviewDate.getUTCDate() +
					'/' +
					(reviewDate.getUTCMonth() + 1) +
					'/' +
					reviewDate.getFullYear();
				return (
					<View style={styles.reviewCard} key={String(review.reviewId)}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}>
							<Text style={[styles.darkMode, styles.reviewText, styles.reviewHeaderText]}>
								{review.author}
							</Text>
							<Text style={[styles.darkMode, styles.reviewText, styles.reviewHeaderText]}>
								{dateString}
							</Text>
						</View>
						<Text style={[styles.darkMode, styles.reviewText]}>{review.review}</Text>
					</View>
				);
			})}
			{renderBottomOrdament()}
		</>
	);
};

export default MovieScreenReviews;

const styles = StyleSheet.create({
	endOrdanmentText: {
		textAlign: 'center',
		padding: 10
	},
	reviewHeaderText: {
		color: Appearance.getColorScheme() == 'dark' ? '#D8D8D8' : '#1B2430',
		fontSize: 12
	},
	reviewText: {
		textAlign: 'left',
		paddingLeft: 10,
		paddingRight: 10
	},
	reviewCard: {
		backgroundColor: Appearance.getColorScheme() == 'dark' ? '#1B2430' : '#F9F9F9',
		margin: 5,
		padding: 5,
		borderRadius: 10
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	starContainer: {
		padding: 10,
		maxWidth: 130
	},
	starImage: {
		width: 120,
		height: 180
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 5
	},
	description: {
		margin: 5
	},
	image: {
		width: 500,
		height: 160
	},
	image_container: {
		marginBottom: 10
	},
	pillContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	pill: {
		padding: 6,
		margin: 8,
		width: 'auto',
		backgroundColor: '#497174',
		borderRadius: 14,
		color: 'white',
		overflow: 'hidden'
	}
});
