import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	Appearance,
	FlatList,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useSetRecoilState } from 'recoil';
import EmptyMovieList from '../components/EmptyMovieList';
import SearchMovieElement from '../components/SearchMovieElement';
import MovieServices from '../GraphQL/MovieServices';
import { MovieInterface } from '../GraphQL/MovieServices/types';
import { selectedMovieState } from '../recoil/atoms';

/**
 * Screen for searching for movies.
 */

const SearchScreen = () => {
	const [movies, setMovies] = useState<MovieInterface[]>([]);
	const [search, setSearch] = useState<String>('');
	const [alreadyShown, setAldreayShown] = useState<number>(0);
	const setSelectedMovie = useSetRecoilState(selectedMovieState);
	const navigation = useNavigation();

	const updateSearch = (search: String) => {
		setSearch(search);
	};

	useEffect(() => {
		MovieServices.searchMovies(search, 'vote_count', -1, 0, 20).then((new_movies) => {
			let res = (new_movies as unknown as MovieInterface[]).filter(
				(v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
			);
			setAldreayShown(res.length);
			setMovies(res);
		});
	}, [search]);

	const fetchMoreMovies = () => {
		MovieServices.searchMovies(search, 'vote_count', -1, alreadyShown, 20).then((new_movies) => {
			let res = movies
				?.concat(new_movies as unknown as MovieInterface[])
				.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
			setAldreayShown(res.length);
			setMovies(res);
		});
	};

	return (
		<>
			<SearchBar
				placeholder="Search movie titles!"
				onChangeText={updateSearch}
				value={String(search)}
				lightTheme={Appearance.getColorScheme() != 'dark'}
			/>
			<SafeAreaView style={styles.container}>
				<FlatList
					style={styles.container}
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={
						movies.length < 1 && search != '' ? (
							<Text style={[styles.darkMode]}>
								No matches for {search}. Search works best with full words or titles!
							</Text>
						) : search == '' ? (
							<></>
						) : (
							<EmptyMovieList />
						)
					}
					horizontal={false}
					onEndReachedThreshold={0.5}
					onEndReached={fetchMoreMovies}
					data={movies}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									setSelectedMovie(item);
									navigation.navigate('MovieScreen');
								}}>
								<SearchMovieElement key={item.id} movie={item} />
							</TouchableOpacity>
						);
					}}
					keyExtractor={(movie) => String(movie.id)}
				/>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1
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
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	}
});

export default SearchScreen;
