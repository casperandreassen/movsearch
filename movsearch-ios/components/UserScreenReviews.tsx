import { ReviewInterface } from '../GraphQL/MovieServices/types';
import EmptyMovieList from './EmptyMovieList';
import {
	View,
	Text,
	StyleSheet,
	Appearance,
	TouchableOpacity,
	Image,
	FlatList
} from 'react-native';
import { selectedMovieState } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';

type UserScreenReviewsProps = {
	reviews: ReviewInterface[];
	loadMoreReviews: () => void;
	numberOfReviews: number;
};

/**
 * Variant of review component for the user page
 */

const UserScreenReviews = ({
	reviews,
	loadMoreReviews,
	numberOfReviews
}: UserScreenReviewsProps) => {
	const setSelectedMovie = useSetRecoilState(selectedMovieState);
	const navigation = useNavigation();
	return (
		<FlatList
			contentContainerStyle={{ flexGrow: 1 }}
			ListEmptyComponent={
				numberOfReviews == 0 ? (
					<View>
						<Text style={[styles.darkMode, styles.noContent]}>You have no reviews</Text>
					</View>
				) : (
					<EmptyMovieList />
				)
			}
			horizontal={false}
			numColumns={1}
			onEndReachedThreshold={0.4}
			onEndReached={loadMoreReviews}
			data={reviews}
			renderItem={({ item }) => {
				let reviewDate = new Date(Number(item.timestamp));
				let dateString =
					reviewDate.getUTCDate() +
					'/' +
					(reviewDate.getUTCMonth() + 1) +
					'/' +
					reviewDate.getFullYear();
				return (
					<TouchableOpacity
						onPress={() => {
							setSelectedMovie(item.movieObj);
							navigation.navigate('MovieScreen');
						}}>
						<View style={styles.reviewCard}>
							<Image
								style={{ width: 50, height: 80, borderRadius: 8 }}
								source={{
									uri: 'https://image.tmdb.org/t/p/w500' + item.movieObj?.poster_path
								}}></Image>
							<View style={{ width: '88%', flex: 1, justifyContent: 'space-between' }}>
								<Text
									style={[styles.darkMode, { fontSize: 15, paddingLeft: 10, paddingBottom: 5 }]}>
									{item.movieObj?.original_title}
								</Text>
								<View style={{ paddingBottom: 10 }}>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between'
										}}>
										<Text style={[styles.darkMode, styles.reviewText, styles.reviewHeaderText]}>
											{item.author}
										</Text>
										<Text style={[styles.darkMode, styles.reviewText, styles.reviewHeaderText]}>
											{dateString}
										</Text>
									</View>
									<Text style={[styles.darkMode, styles.reviewText]}>{item.review}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				);
			}}
			keyExtractor={(review) => String(review.reviewId)}
		/>
	);
};

export default UserScreenReviews;

const styles = StyleSheet.create({
	noContent: {
		fontSize: 15,
		textAlign: 'center'
	},
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
		borderRadius: 10,
		flex: 0,
		flexDirection: 'row',
		alignItems: 'center'
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
function useNavigate() {
	throw new Error('Function not implemented.');
}
