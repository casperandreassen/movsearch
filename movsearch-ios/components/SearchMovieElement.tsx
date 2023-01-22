import { Genre, MovieInterface } from '../GraphQL/MovieServices/types';
import { View, Image, Text, StyleSheet, Appearance } from 'react-native';

type SearchMovieProps = {
	movie: MovieInterface;
};

/**
 * List element for when one searches for movies.
 */

const SearchMovieElement = ({ movie }: SearchMovieProps) => {
	const getGenreString = (genres: Genre[]) => {
		let genreString: string = '';
		for (let i = 0; i < genres.length; i++) {
			genreString += genres?.at(i)?.name;
			if (i != genres.length - 1) {
				genreString += ' | ';
			}
		}
		return genreString;
	};

	return (
		<View
			style={[
				styles.container,
				{
					borderBottomColor: '#B2B2B2',
					borderBottomWidth: 1,
					paddingBottom: 10
				}
			]}>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<Image
					style={styles.image}
					source={{ uri: 'https://image.tmdb.org/t/p/w300' + movie.poster_path }}
				/>
				<View>
					<Text style={[styles.element_text, styles.darkMode]}>
						{movie.original_title} ({movie.release_date.replace(/(^\d+)(.+$)/i, '$1')})
					</Text>
					<Text style={[styles.element_text, styles.darkMode, { opacity: 0.5 }]}>
						{getGenreString(movie.genres)}
					</Text>
				</View>
			</View>
			<View style={{ width: 60 }}>
				<Text style={[styles.darkMode, { textAlign: 'center' }]}>TMDB</Text>
				<Text style={[styles.darkMode, { color: '#F73D93', textAlign: 'center' }]}>
					{Math.round(Number(movie.vote_average) * 10)}%
				</Text>
			</View>
		</View>
	);
};

export default SearchMovieElement;

const styles = StyleSheet.create({
	image: {
		width: 70,
		height: 100,
		borderRadius: 5
	},
	element_text: {
		textAlign: 'left',
		maxWidth: 250,
		paddingLeft: 20
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	container: {
		margin: 5,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '95%'
	}
});
