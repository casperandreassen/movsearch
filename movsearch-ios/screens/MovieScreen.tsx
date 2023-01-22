import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { selectedMovieState } from '../recoil/atoms';
import { useRecoilState } from 'recoil';
import { Appearance } from 'react-native';
import StarProfile from '../components/StarProfile';
import Reviews from '../components/Reviews';
import { RootStackParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const win = Dimensions.get('window');

/**
 * Movie details screen
 */

// eslint-disable-next-line no-unused-vars
const MovieScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'MovieScreen'>) => {
	const [selectedMovie] = useRecoilState(selectedMovieState);
	const [backDropLink, setbackDropLink] = useState<string>(
		'https://image.tmdb.org/t/p/original' + selectedMovie?.backdrop_path
	);
	return (
		<ScrollView>
			<View style={styles.image_container}>
				<ImageBackground
					source={{ uri: backDropLink }}
					onError={() => {
						setbackDropLink('https://image.tmdb.org/t/p/w1028' + selectedMovie?.poster_path);
					}}
					style={styles.image}>
					<LinearGradient
						colors={[
							'transparent',
							Appearance.getColorScheme() == 'dark' ? '#000000' : 'rgb(242, 242, 247)'
						]}
						locations={[0.6, 0.98]}
						style={{ height: '100%', width: '100%' }}></LinearGradient>
					<View
						style={{
							position: 'absolute',
							top: win.width / 1.45 - 30,
							left: 0,
							right: 0,
							bottom: 0,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Text
							style={{
								color: Appearance.getColorScheme() == 'dark' ? '#ffffff' : 'black',
								fontSize: win.width > 375 ? 20 : 14,
								maxWidth: win.width - 20
							}}>
							{selectedMovie?.original_title}
						</Text>
					</View>
				</ImageBackground>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					margin: 10
				}}>
				<View style={{ alignItems: 'center' }}>
					<Text style={[styles.darkMode, styles.infoBarHeaderText]}>TMDB User Score</Text>
					<Text style={[styles.darkMode, styles.infoBarText, { color: '#F73D93' }]}>
						{Math.round(Number(selectedMovie?.vote_average) * 10)}%
					</Text>
				</View>
				<View>
					<Text style={[styles.darkMode, styles.infoBarHeaderText]}>Release date</Text>
					<Text style={[styles.darkMode, styles.infoBarText]}>{selectedMovie?.release_date}</Text>
				</View>
				<View>
					<Text style={[styles.darkMode, styles.infoBarHeaderText]}>Runtime</Text>
					<Text style={[styles.darkMode, styles.infoBarText]}>
						{Math.floor(Number(selectedMovie?.runtime) / 60)}h {Number(selectedMovie?.runtime) % 60}
						m
					</Text>
				</View>
			</View>
			<View>
				<Text style={[styles.heading, styles.darkMode]}>Synopsis</Text>
				<Text style={[styles.description, styles.darkMode]}>{selectedMovie?.overview}</Text>
			</View>
			<View style={styles.pillContainer}>
				{selectedMovie?.genres.map((genre) => {
					return (
						<Text key={String(genre.name)} style={[styles.pill]}>
							{genre.name}
						</Text>
					);
				})}
			</View>
			<View>
				<Text style={[styles.darkMode, styles.heading]}>Cast</Text>
				<ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'space-evenly' }}>
					{selectedMovie?.stars.map((star) => {
						return <StarProfile key={String(star.name)} star={star} />;
					})}
				</ScrollView>
			</View>
			<View>
				<Text style={[styles.darkMode, styles.heading]}>Reviews</Text>
				<Reviews type="movie" search={String(selectedMovie?.id)} userScreen={false} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	infoBarText: {
		textAlign: 'center',
		fontSize: 16
	},
	infoBarHeaderText: {
		color: Appearance.getColorScheme() == 'dark' ? '#D8D8D8' : '#1B2430',
		textAlign: 'center',
		fontSize: 10,
		paddingLeft: 2,
		paddingRight: 2
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
		width: win.width,
		height: win.width / 1.45
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
		backgroundColor: '#1B2430',
		borderRadius: 14,
		color: 'white',
		overflow: 'hidden'
	}
});

export default MovieScreen;
