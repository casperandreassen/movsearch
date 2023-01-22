import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Loading-spinner for application
 */

const EmptyMovieList = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#EB6440" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default EmptyMovieList;
