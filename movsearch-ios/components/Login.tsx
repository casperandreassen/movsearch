import { useState } from 'react';
import {
	Text,
	StyleSheet,
	Appearance,
	View,
	Pressable,
	Alert,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import MovieServices from '../GraphQL/MovieServices';
import { authInfo, loggedIn } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [username, setUsername] = useState<String>('');
	const [password, setPassword] = useState<String>('');
	const [wrongAuthInfo, setWrongAuthInfo] = useState<boolean>(false);
	const setUserInfo = useSetRecoilState(authInfo);
	const setUserLoggedIn = useSetRecoilState(loggedIn);
	const navigation = useNavigation();

	const loginUser = () => {
		setLoading(true);
		if (username.length > 0 && password.length > 0) {
			MovieServices.loginUser(username, password)
				.then((res) => {
					if (res != null) {
						setUserLoggedIn(true);
						setUserInfo(res);
						AsyncStorage.setItem('authInfo', String(res.userId));
					} else {
						setWrongAuthInfo(true);
					}
					setLoading(false);
				})
				.catch(() => {
					Alert.alert('Something went wrong :/', 'Try again later');
					setLoading(false);
				});
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
			<View>
				<Text style={[styles.darkMode, styles.header]}>Login</Text>
				<Text style={styles.darkMode}>Please sign in to continue</Text>
			</View>
			<Input
				style={styles.darkMode}
				label="Username"
				autoCapitalize="none"
				errorMessage={wrongAuthInfo ? 'Wrong username or password' : ''}
				onChangeText={(value) => setUsername(value)}
				leftIcon={{ type: 'font-awesome', name: 'user' }}
			/>
			<Input
				style={styles.darkMode}
				autoCapitalize="none"
				errorMessage={wrongAuthInfo ? 'Wrong username or password' : ''}
				onChangeText={(value) => setPassword(value)}
				label="Password"
				secureTextEntry={true}
				leftIcon={{ type: 'material-community', name: 'onepassword' }}
			/>
			<Button
				title="LOG IN"
				loading={loading}
				onPress={loginUser}
				buttonStyle={{
					backgroundColor: 'black',
					borderWidth: 2,
					borderColor: 'white',
					borderRadius: 30
				}}
				containerStyle={{
					width: 200,
					marginHorizontal: 50,
					marginVertical: 10
				}}
				titleStyle={{ fontWeight: 'bold' }}
			/>
			<Pressable>
				<Text
					onPress={() => {
						navigation.navigate('CreateAccount');
					}}
					style={styles.darkMode}>
					Dont have an account?
				</Text>
			</Pressable>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 20
	},
	darkMode: {
		color: Appearance.getColorScheme() == 'dark' ? 'white' : 'black'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%'
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

export default Login;
