import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Login from '../components/Login';
import { loggedIn } from '../recoil/atoms';
import { View } from 'react-native';

/**
 * Screen that checks if user is logged in before leaving a review.
 */

const SignInInFlow = () => {
	const [userLoggedIn] = useRecoilState(loggedIn);
	const navigation = useNavigation();

	useEffect(() => {
		if (userLoggedIn) {
			navigation.navigate('MovieScreen');
		}
	}, [userLoggedIn]);

	return (
		<View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
			<Login />
		</View>
	);
};

export default SignInInFlow;
