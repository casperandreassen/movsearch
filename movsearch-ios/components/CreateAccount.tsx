import React, { useState } from 'react';
import { Text, StyleSheet, View, Appearance, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import MovieServices from '../GraphQL/MovieServices';
import { UserInput } from '../GraphQL/MovieServices/types';
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {
	const [username, setUsername] = useState<String>('');
	const [email, setEmail] = useState<String>('');
	const [password, setPassword] = useState<String>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
	const navigation = useNavigation();

	const signUpUser = () => {
		setLoading(true);
		if (username.length > 0 && email.length > 4 && passwordsMatch && password.length > 0) {
			let user: UserInput = {
				username: username,
				email: email,
				password: password
			};
			MovieServices.createUser(user)
				.then((res) => {
					if (res == null) {
						Alert.alert('Username taken', 'Choose a different username', [{ text: 'Try again' }]);
					} else {
						Alert.alert('Account created succesfully!', 'You can now log in', [
							{ text: 'Go to login', onPress: () => navigation.goBack() }
						]);
					}
					setLoading(false);
				})
				.catch(() => {
					Alert.alert('Mhmm', 'Random error', [{ text: 'Try again' }]);
					setLoading(false);
				});
		} else {
			Alert.alert('Apapap!', 'All fields need to be filled out');
			setLoading(false);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
			style={{
				flex: 1,
				width: '100%'
			}}>
			<View style={styles.container}>
				<View>
					<Text style={[styles.darkMode, { fontSize: 17, paddingBottom: 10 }]}>
						Create a movsearch account!
					</Text>
				</View>
				<Input
					style={styles.darkMode}
					label="Username"
					autoCapitalize="none"
					onChangeText={(value) => setUsername(value)}
					leftIcon={{ type: 'font-awesome', name: 'user' }}
				/>
				<Input
					style={styles.darkMode}
					autoCapitalize="none"
					onChangeText={(value) => setEmail(value)}
					label="Email"
					leftIcon={{ type: 'entypo', name: 'email' }}
				/>
				<Input
					style={styles.darkMode}
					autoCapitalize="none"
					onChangeText={(value) => setPassword(value)}
					label="Password"
					secureTextEntry={true}
					leftIcon={{ type: 'material-community', name: 'onepassword' }}
				/>
				<Input
					style={styles.darkMode}
					autoCapitalize="none"
					errorMessage={passwordsMatch ? '' : 'Passwords needs to be equal'}
					onChangeText={(value) => {
						if (value != password) {
							setPasswordsMatch(false);
						} else {
							setPasswordsMatch(true);
						}
					}}
					label="Confirm password"
					secureTextEntry={true}
					leftIcon={{ type: 'material-community', name: 'onepassword' }}
				/>
				<Button
					title="SIGN UP"
					loading={loading}
					onPress={signUpUser}
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
			</View>
		</ScrollView>
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
	}
});

export default CreateAccount;
