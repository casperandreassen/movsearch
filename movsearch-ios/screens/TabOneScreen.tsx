import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	Appearance,
	View,
	Text,
	ScrollView,
	Alert
} from 'react-native';
import DisplayMovies from '../components/DisplayMovies';
import EmptyMovieList from '../components/EmptyMovieList';

import MovieServices from '../GraphQL/MovieServices';
import { MovieInterface } from '../GraphQL/MovieServices/types';
import { RootTabScreenProps } from '../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedGenresState, selectedMovieState } from '../recoil/atoms';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const data = [
	{ label: 'Most popular', value: 'popularity' },
	{ label: 'Most voted', value: 'vote_count' }
];

type genre = {
	name: String;
	selected: boolean;
};

const genreData: genre[] = [
	{ name: 'Action', selected: false },
	{ name: 'Drama', selected: false },
	{ name: 'Adventure', selected: false },
	{ name: 'Comedy', selected: false },
	{ name: 'Science Fiction', selected: false },
	{ name: 'Thriller', selected: false },
	{ name: 'Horror', selected: false },
	{ name: 'Documentary', selected: false },
	{ name: 'Romance', selected: false },
	{ name: 'Family', selected: false },
	{ name: 'Animation', selected: false },
	{ name: 'Crime', selected: false },
	{ name: 'Mystery', selected: false },
	{ name: 'War', selected: false }
];

/**
 * Screen for movies tab
 */

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const [movies, setMovies] = useState<MovieInterface[]>([]);
	const [alreadyShown, setAldreayShown] = useState<number>(0);
	const setSelectedMovie = useSetRecoilState(selectedMovieState);
	const [value, setValue] = useState<string>('popularity');
	const [selectedGenres, setSelectedGenres] = useRecoilState(selectedGenresState);

	useEffect(() => {
		MovieServices.getMovies(String(value), -1, 0, 20, selectedGenres)
			.then((new_movies) => {
				let res = (new_movies as unknown as MovieInterface[]).filter(
					(v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
				);
				setAldreayShown(res.length);
				setMovies(res);
			})
			.catch(() => {
				Alert.alert('Something is wrong with our servers, try again later');
			});
	}, [value, selectedGenres]);

	const fetchMoreMovies = () => {
		MovieServices.getMovies(String(value), -1, alreadyShown, 20, selectedGenres).then(
			(new_movies) => {
				let res = movies
					?.concat(new_movies as unknown as MovieInterface[])
					.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
				setAldreayShown(res.length);
				setMovies(res);
			}
		);
	};

	return (
		<>
			<Dropdown
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder="popularity"
				value={value}
				onChange={(item) => {
					setValue(item.value);
				}}
				renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="bars" size={20} />}
			/>
			<SafeAreaView style={styles.container}>
				<ScrollView horizontal={true} persistentScrollbar={true} style={styles.container}>
					{genreData.map((genre: genre) => {
						return (
							<TouchableOpacity
								key={String(genre.name)}
								onPress={() => {
									let i = selectedGenres.indexOf(genre.name);
									let viewIndex = genreData.findIndex((object) => {
										return object.name === genre.name;
									});
									let tmp = Array.from(selectedGenres);
									if (i == -1) {
										tmp.push(genre.name);
										genreData.splice(viewIndex, 1);
										genreData.splice(tmp.length - 1, 0, genre);
										genre.selected = true;
									} else {
										tmp.splice(i, 1);
										genre.selected = false;
									}
									setSelectedGenres(tmp);
								}}>
								<View style={styles.pillContainer}>
									<Text
										style={[
											styles.pill,
											{ backgroundColor: genre.selected ? '#EB6440' : '#1B2430' }
										]}>
										{genre.name}
									</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
				<FlatList
					columnWrapperStyle={{ justifyContent: 'space-around' }}
					contentContainerStyle={{ flexGrow: 1 }}
					style={styles.container}
					ListEmptyComponent={
						selectedGenres.length > 0 ? (
							<Text style={styles.darkMode}>Try selecting fewer genres</Text>
						) : (
							<EmptyMovieList />
						)
					}
					horizontal={false}
					numColumns={2}
					onEndReachedThreshold={1}
					onEndReached={fetchMoreMovies}
					data={movies}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									setSelectedMovie(item);
									navigation.navigate('MovieScreen');
								}}>
								<DisplayMovies key={item.id} movie={item} />
							</TouchableOpacity>
						);
					}}
					keyExtractor={(movie) => String(movie.id)}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
	dropdown: {
		marginTop: 16,
		marginLeft: 10,
		marginRight: 10,
		height: 30,
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	icon: {
		marginRight: 5,
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	placeholderStyle: {
		fontSize: 16,
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	selectedTextStyle: {
		fontSize: 16,
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	iconStyle: {
		width: 20,
		height: 20
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
		borderRadius: 14,
		fontSize: 16,
		color: 'white',
		overflow: 'hidden'
	}
});
