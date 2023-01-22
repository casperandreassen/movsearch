import { View, Text, StyleSheet } from 'react-native';
import { Appearance } from 'react-native';
import { useRecoilState } from 'recoil';
import { authInfo } from '../recoil/atoms';
import Reviews from './Reviews';

/**
 * User info component
 */

const UserInfo = () => {
	const [userInfo] = useRecoilState(authInfo);
	return (
		<View style={styles.userInfoContainer}>
			<View style={{ height: 80, justifyContent: 'space-between', paddingTop: 15 }}>
				<Text style={[styles.darkMode, styles.helloHeader]}>Hello, {userInfo?.username}!</Text>
				<Text style={[styles.darkMode, styles.reviewHeaderText]}>Your reviews</Text>
			</View>
			<Reviews type="userId" search={String(userInfo?.userId)} userScreen={true} />
		</View>
	);
};

const styles = StyleSheet.create({
	userInfoContainer: {
		width: '100%',
		height: '100%'
	},
	reviewsContainer: {
		width: '100%'
	},
	helloHeader: {
		fontSize: 24,
		textAlign: 'center'
	},
	reviewHeaderText: {
		color: Appearance.getColorScheme() == 'dark' ? '#D8D8D8' : '#1B2430',
		fontSize: 16,
		paddingLeft: 10
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	}
});

export default UserInfo;
