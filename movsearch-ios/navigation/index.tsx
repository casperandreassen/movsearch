/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
	useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Alert, ColorSchemeName, Pressable, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MovieScreen from '../screens/MovieScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authInfo, loggedIn, selectedMovieState } from '../recoil/atoms';
import ReviewScreen from '../screens/ReviewScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateAccount from '../components/CreateAccount';
import SignInInFlow from '../screens/SignInInFlow';
import SearchScreen from '../screens/SearchScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const [selectedMovie] = useRecoilState(selectedMovieState);
	const [userLoggedIn] = useRecoilState(loggedIn);
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			<Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search' }} />
			<Stack.Screen
				name="CreateAccount"
				component={CreateAccount}
				options={{ title: 'Create Account' }}
			/>
			<Stack.Screen
				name="SignInInFlow"
				component={SignInInFlow}
				options={{ title: 'Sign in to leave review!' }}
			/>
			<Stack.Screen
				name="MovieScreen"
				component={MovieScreen}
				initialParams={{ reviewCreated: false }}
				options={{
					title: selectedMovie?.original_title,
					headerRight: () => (
						<Pressable
							onPress={() => {
								if (userLoggedIn) {
									navigation.navigate('ReviewScreen');
								} else {
									Alert.alert('Not signed in', 'You need to sign in to leave a review', [
										{
											text: 'Cancel'
										},
										{
											text: 'Go to login',
											onPress: () => navigation.navigate('SignInInFlow')
										}
									]);
								}
							}}
						>
							<Text
								style={{
									fontSize: 18,
									marginRight: 10,
									color: '#F73D93'
								}}
							>
								Add review
							</Text>
						</Pressable>
					)
				}}
			/>
			<Stack.Screen
				name="ReviewScreen"
				component={ReviewScreen}
				options={{ title: 'Add review' }}
			/>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();
	const [userLoggedIn, setUserLoggedIn] = useRecoilState(loggedIn);
	const setAuthInfo = useSetRecoilState(authInfo);

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
					title: 'Browse movies',
					tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
					headerRight: () => (
						<View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
							<Pressable onPress={() => navigation.navigate('SearchScreen')}>
								<FontAwesome
									name="search"
									size={25}
									color={Colors[colorScheme].text}
									style={{ marginRight: 15 }}
								/>
							</Pressable>
						</View>
					)
				})}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{
					title: 'User',
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
					headerRight: () => (
						<Pressable
							onPress={() => {
								setUserLoggedIn(false);
								setAuthInfo(undefined);
								AsyncStorage.removeItem('authInfo');
							}}
						>
							<Text
								style={{
									fontSize: 18,
									marginRight: 10,
									color: '#F73D93'
								}}
							>
								{!userLoggedIn ? '' : 'Sign out'}
							</Text>
						</Pressable>
					)
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
