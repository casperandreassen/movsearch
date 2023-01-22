import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Appearance, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useRecoilState } from 'recoil';
import MovieServices from '../GraphQL/MovieServices';
import { authInfo, selectedMovieState } from '../recoil/atoms';

/**
 * Screen for creating a review.
 */

const ReviewScreen = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedMovie] = useRecoilState(selectedMovieState);
	const [userInfo] = useRecoilState(authInfo);
	const [review, setReview] = useState<String>('');
	const [displayName, setDisplayName] = useState<String>('');
	const navigation = useNavigation();

	const addReview = () => {
		setLoading(true);
		MovieServices.createReview(
			displayName,
			String(userInfo?.userId),
			review,
			Number(selectedMovie?.id)
		).then(() => {
			setLoading(false);
			Alert.alert('Sucess', 'Review submitted!', [
				{
					text: 'See review!',
					onPress: () => navigation.navigate('MovieScreen')
				}
			]);
		});
	};

	return (
		<View style={styles.addReviewContainer}>
			<View>
				<Text style={[styles.darkMode, styles.titleHeader]}>
					{selectedMovie?.original_title}({selectedMovie?.release_date})
				</Text>
			</View>
			<View style={{ flexDirection: 'column', alignItems: 'center' }}>
				<Input
					style={[styles.darkMode, { height: 200 }]}
					label="Review"
					multiline={true}
					onChangeText={(text) => {
						setReview(text);
					}}
					leftIcon={{ type: 'material-community', name: 'typewriter' }}
				/>
				<Input
					style={styles.darkMode}
					label="DisplayName"
					onChangeText={(text) => {
						setDisplayName(text);
					}}
					leftIcon={{ type: 'font-awesome', name: 'user' }}
				/>
				<Button
					title="ADD REVIEW"
					loading={loading}
					onPress={addReview}
					buttonStyle={{
						backgroundColor: 'black',
						borderWidth: 2,
						borderColor: 'white',
						borderRadius: 30
					}}
					containerStyle={{
						width: 200,
						marginHorizontal: 50,
						marginVertical: 10
					}}
					titleStyle={{ fontWeight: 'bold' }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	titleHeader: {
		fontSize: 30,
		textAlign: 'center',
		padding: 10
	},
	addReviewContainer: {
		flex: 1,
		justifyContent: 'flex-start'
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	}
});

export default ReviewScreen;
