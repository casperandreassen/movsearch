import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { loggedIn } from '../recoil/atoms';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import UserInfo from '../components/UserInfo';
import Login from '../components/Login';
import { RootTabScreenProps } from '../types';

/**
 * Screen for user tab.
 */

// eslint-disable-next-line no-unused-vars
export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
	const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedIn);

	useEffect(() => {
		let authDetails = AsyncStorage.getItem('authInfo');
		if (authDetails == null) {
			setUserLoggedIn(true);
		}
	});

	return <View style={styles.container}>{userLoggedIn ? <UserInfo /> : <Login />}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
	}
});
