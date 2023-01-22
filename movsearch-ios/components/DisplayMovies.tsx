import { useState } from 'react';
import { Image, Text, View, StyleSheet, Appearance } from 'react-native';
import { MovieInterface } from '../GraphQL/MovieServices/types';

const styles = StyleSheet.create({
	image: {
		width: 170,
		height: 250,
		borderRadius: 10
	},
	element_text: {
		textAlign: 'center',
		maxWidth: 170,
		marginTop: 3
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	}
});

type DisplayMovieProps = {
	movie: MovieInterface;
};

/**
 * Container component for movies on main screen.
 */

const DisplayMovies = ({ movie }: DisplayMovieProps) => {
	const [imageSource, setImageSource] = useState<string>(
		'https://image.tmdb.org/t/p/w300' + movie.poster_path
	);
	return (
		<View style={{ margin: 5 }}>
			<Image
				style={styles.image}
				source={{ uri: imageSource }}
				onError={() => {
					setImageSource('https://www.prokerala.com/movies/assets/img/no-poster-available.jpg');
				}}
			/>
			<Text style={[styles.element_text, styles.darkMode]}>
				{movie.original_title} ({movie.release_date.replace(/(^\d+)(.+$)/i, '$1')})
			</Text>
		</View>
	);
};

export default DisplayMovies;
