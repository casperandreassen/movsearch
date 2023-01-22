import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from '../GraphQL/MovieServices/types';
import { Appearance } from 'react-native';

type StarProfileProps = {
	star: Star;
};

/**
 * List item for stars in movie-details page.
 */

const StarProfile = ({ star }: StarProfileProps) => {
	const [imageSource, setImageSource] = useState(
		'https://image.tmdb.org/t/p/w200' + star.profile_path
	);

	return (
		<View style={styles.starContainer}>
			<Image
				key={String(star.name)}
				style={styles.starImage}
				source={{ uri: imageSource }}
				onError={() => {
					setImageSource(
						'https://www.kindpng.com/picc/m/643-6430001_no-profile-picture-girl-hd-png-download.png'
					);
				}}
			/>
			<Text
				style={[
					{
						fontSize: 13,
						fontWeight: '600',
						textAlign: 'center'
					},
					styles.darkMode
				]}
			>
				{star.name}
			</Text>
			<Text
				style={[
					{
						fontSize: 10,
						textAlign: 'center'
					},
					styles.darkMode
				]}
			>
				{star.character}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	starContainer: {
		marginTop: 10,
		marginLeft: 4,
		marginBottom: 10,
		borderRadius: 4,
		borderColor: Appearance.getColorScheme() == 'dark' ? undefined : '#E0E0E0',
		borderWidth: 0.5,
		maxWidth: 130,
		backgroundColor: Appearance.getColorScheme() == 'dark' ? '#1B2430' : '#F9F9F9'
	},
	starImage: {
		width: 120,
		height: 180,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		margin: 'auto'
	}
});

export default StarProfile;
